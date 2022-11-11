import * as core from '@actions/core'
import {formatISO, fromUnixTime} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'
import {insertToGcal} from './gcal'
import {getDuration} from './getduration'
import {GetDurationsResponse} from './types/duration'

async function run(): Promise<void> {
  try {
    const wakatimeAPIKey: string = core.getInput('wakatime-api-key')
    const timeZone: string = ((input: string) =>
      input === '' ? 'Asia/Tokyo' : input)(core.getInput('timezone'))
    const yesterday: Date = ((today: Date) => {
      today.setDate(today.getDate() - 1)
      return today
    })(utcToZonedTime(new Date(), timeZone))

    core.info(`target date: ${formatISO(yesterday)}`)

    const durations: GetDurationsResponse = await getDuration(
      wakatimeAPIKey,
      yesterday
    )
    const projPlace = core.getInput('project-name-place')
    const titleOverride = core.getInput('title-override')

    const colorId: string = core.getInput('color-id')
    const calenderId: string = core.getInput('calendar-id')
    const projects: string[] = core.getMultilineInput('projects')
    const token: string = core.getInput('access_token')

    core.info(`Insert ${durations.data.length} events`)

    for await (const duration of durations.data.filter(durs =>
      projects.length === 0
        ? true // if projects is empty, insert all projects
        : projects.some(proj => proj === durs.project)
    )) {
      const start = fromUnixTime(duration.time)

      const end = fromUnixTime(duration.time + duration.duration)

      const title = projPlace === 'title' ? duration.project : titleOverride
      const description = projPlace === 'description' ? duration.project : ''

      await insertToGcal(
        token,
        calenderId,
        colorId,
        title,
        start,
        end,
        description
      )
      // for rate limit
      await new Promise<void>(resolve =>
        setTimeout(() => {
          resolve()
        }, 500)
      )
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
