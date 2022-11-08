import * as core from '@actions/core'
import {fromUnixTime} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'
import {authorize, insertToGcal} from './gcal'
import {getDuration} from './getduration'
import {GetDurationsResponse} from './types/duration'

async function run(): Promise<void> {
  try {
    const wakatimeAPIKey: string = core.getInput('wakatime-api-key')
    const yesterday: Date = ((today: Date) => {
      today.setDate(today.getDate() - 1)
      return today
    })(utcToZonedTime(new Date(), 'Asia/Tokyo'))

    const durations: GetDurationsResponse = await getDuration(
      wakatimeAPIKey,
      yesterday
    )

    const googleCredential: string = core.getInput('google-credential')
    const colorId: string = core.getInput('color-id')
    const calenderId: string = core.getInput('calender-id')
    const projects = core.getMultilineInput('projects')

    const auth = authorize(googleCredential)

    await Promise.all(
      durations.data
        .filter(durs =>
          projects.length === 0
            ? true // if projects is empty, insert all projects
            : projects.some(proj => proj === durs.project)
        )
        .map(async duration => {
          const start = fromUnixTime(duration.time)
          const end = fromUnixTime(duration.time + duration.duration)

          return insertToGcal(
            auth,
            calenderId,
            colorId,
            duration.project,
            start,
            end
          )
        })
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
