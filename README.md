# wakatime-gcal-exporter

前日のWakaTimeのログをGoogleカレンダーにイベントとして登録します。

現在TimezoneはAsia/Tokyoのみ対応しています。

## Usage

```yml
- uses: google-github-actions/auth@v1.0.0
  id: auth
  name: Authenticate to Google Cloud
  with:
    workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
    service_account: ${{ secrets.SERVICE_ACCOUNT }}
    token_format: access_token
    access_token_scopes: https://www.googleapis.com/auth/calendar
- uses: hijiki51/wakatime-gcal-exporter@v1.1.0
  with:
    access_token: ${{ steps.auth.outputs.access_token }}
    wakatime-api-key: ${{secrets.WAKATIME_API_KEY}}
    calendar-id: ${{secrets.CALENDAR_ID}}
    timezone: 'Asia/Tokyo' # optional, default: 'Asia/Tokyo'
    color-id: 7 # optional
    project-name-place: 'title' # optional, default: 'title', 'title' or 'description'
    title-override: 'WakaTime' # optional
    projects: | # optional
      project1
      project2 
```