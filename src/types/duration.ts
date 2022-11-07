export interface Duration {
  project: string
  time: number
  duration: number
}

export interface GetDurationsResponse {
  data: Duration[]
  branches: string[]
  start: string
  end: string
  timezone: string
}
