import {JSONClient} from 'google-auth-library/build/src/auth/googleauth'
import {formatRFC3339} from 'date-fns'
import {google} from 'googleapis'
import {GoogleAuth} from 'google-auth-library'

export const insertToGcal = async (
  auth: GoogleAuth<JSONClient>,
  calenderId: string,
  colorId: string,
  title: string,
  start: Date,
  end: Date
): Promise<void> => {
  const calender = google.calendar({version: 'v3', auth})
  const startDate = formatRFC3339(start)
  const endDate = formatRFC3339(end)

  await calender.events.insert({
    calendarId: calenderId,
    requestBody: {
      colorId,
      summary: title,
      start: {
        dateTime: startDate
      },
      end: {
        dateTime: endDate
      }
    }
  })
}

export const authorize = (content: string): GoogleAuth<JSONClient> => {
  try {
    const credential = JSON.parse(content)
    const client = google.auth.fromJSON(credential)

    return new GoogleAuth({authClient: client})
  } catch (error) {
    throw new Error('Invalid credential json')
  }
}
