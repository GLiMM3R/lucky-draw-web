import type { Wheel } from './wheel'
import type { WheelPrize } from './wheelPrize'

export interface WheelReportWithIncludes {
  id: string
  wheel: Wheel
  prize: WheelPrize
  createdBy: object
  createdAt: Date
  updatedAt: Date
}

export interface WheelReport {
  id: string
  wheelId: string
  prizeId: string
  createdBy: object
  createdAt: Date
  updatedAt: Date
}
