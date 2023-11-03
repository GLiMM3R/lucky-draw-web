import type { WheelReport } from './wheelReport'

export interface WheelPrize {
  id: string
  wheelId: string
  title: string
  amount: number
  image: string
  isComplete: boolean
  createdBy: object
  createdAt: Date
  updatedAt: Date
}

export interface WheelPrizeWithWinner {
  id: string
  wheelId: string
  title: string
  amount: number
  image: string
  winners: WheelReport[]
  isComplete: boolean
  createdBy: object
  createdAt: Date
  updatedAt: Date
}

export interface CreateWheelPrize {
  slug: string
  title: string
  amount: number
  image?: any
}

export interface UpdateWheelPrize {
  slug: string
  title?: string
  amount?: number
  image?: any
  isComplete?: boolean
}
