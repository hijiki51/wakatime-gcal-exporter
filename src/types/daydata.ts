import {Branch} from './branch'
import {Category} from './category'
import {Dependency} from './dependency'
import {Editor} from './editor'
import {Entity} from './entity'
import {Language} from './languages'
import {OperatingSystem} from './os'
import {Project} from './project'
import {SummaryRange} from './summaryrange'

export interface DayData {
  grand_total: {
    digital: string
    hours: number
    minutes: number
    text: string
    total_seconds: number
  }
  categories: Category[]
  projects: Project[]
  languages: Language[]
  editors: Editor[]
  operating_systems: OperatingSystem[]
  dependencies: Dependency[]
  branches?: Branch[]
  entities?: Entity[]
  range: SummaryRange
}

export interface GetSummaryResponce {
  data: DayData[]
  cummulative_total: {
    seconds: number
    text: string
  }
  start: string
  end: string
}
