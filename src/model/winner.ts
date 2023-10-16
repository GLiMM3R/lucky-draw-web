import type { Prize } from './prize'

export interface Winner {
  id: string
  campaignId: string
  prizeId: string
  winnerName: string
  winnerPhone: string
  createdAt: Date
  updatedAt: Date
  prize?: Prize[]
}
