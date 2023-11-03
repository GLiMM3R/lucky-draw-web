import type { Draw } from './draw'
import type { DrawPrize } from './drawPrize'
import type { User } from './user'

export interface DrawReport {
  id: string
  drawId: string
  prizeId: string
  customerId: string
  name: string
  phone: string
  createdBy: User
  createdAt: Date
  updatedAt: Date
}

export interface DrawReportWithIncludes {
  id: string
  draw: Draw
  prize: DrawPrize
  customerId: string
  name: string
  phone: string
  createdBy: User
  createdAt: Date
  updatedAt: Date
}
