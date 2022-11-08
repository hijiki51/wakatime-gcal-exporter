# wakatime-gcal-exporter

前日のWakaTimeのログをGoogleカレンダーにイベントとして登録します。

現在TimezoneはAsia/Tokyoのみ対応しています。

## Usage

```yml
- uses: hijiki51/wakatime-gcal-exporter@v1.0.0
  with:
    wakatime-api-key: ${{ secrets.WAKATIME_API_KEY }}
    google-credential: ${{ secrets.GOOGLE_CREDENTIAL }}
    calendar-id: ${{ secrets.CALENDAR_ID }}
    color-id: 7 # optional
    projects: | # optional
      project1
      project2 
```