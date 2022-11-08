import {GetDurationsResponse} from './types/duration'
import fetch from 'node-fetch'
import {format} from 'date-fns'
import {debug, error} from '@actions/core'

export const getDuration = async (
  api_key: string,
  date: Date
): Promise<GetDurationsResponse> => {
  const token = Buffer.from(api_key).toString('base64')
  const param = new URLSearchParams({
    date: format(date, 'yyyy-MM-dd')
  }).toString()
  const response = await fetch(
    `https://wakatime.com/api/v1/users/current/durations?${param}`,
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  )

  const tp = await response.json()

  if (!isGetDurationResponse(tp)) {
    debug(JSON.stringify(tp))
    error(response.statusText)
    throw new Error(`Invalid response from API:${response.statusText}`)
  }

  return tp
}

const isGetDurationResponse = (obj: unknown): obj is GetDurationsResponse => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  const data = obj as GetDurationsResponse

  if (!Array.isArray(data.data)) {
    return false
  }

  return true
}
