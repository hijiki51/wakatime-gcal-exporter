import {formatRFC3339} from 'date-fns'
import fetch, {Response} from 'node-fetch'

export const insertToGcal = async (
  access_token: string,
  calenderId: string,
  colorId: string,
  title: string,
  start: Date,
  end: Date
): Promise<Response> =>
  fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calenderId}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({
        colorId,
        summary: title,
        start: {
          dateTime: formatRFC3339(start)
        },
        end: {
          dateTime: formatRFC3339(end)
        }
      })
    }
  )
