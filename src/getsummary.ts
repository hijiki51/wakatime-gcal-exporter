import {GetSummaryResponse} from './types/daydata'
import fetch from 'node-fetch'

export const getSummary = async (
  api_key: string
): Promise<GetSummaryResponse> => {
  const token = Buffer.from(api_key).toString('base64')
  const response = await fetch(
    'https://wakatime.com/api/v1/users/current/summaries',
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  )

  const tp = await response.json()

  if (!isGetSummaryResponse(tp)) {
    throw new Error('Invalid response from API')
  }

  return tp
}

const isGetSummaryResponse = (obj: unknown): obj is GetSummaryResponse => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  const data = obj as GetSummaryResponse

  if (!Array.isArray(data.data)) {
    return false
  }

  return true
}
