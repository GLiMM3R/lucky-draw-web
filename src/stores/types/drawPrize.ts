import type { DrawReport } from './drawReport'

export interface DrawPrize {
  id: string
  drawId: string
  rank: number
  title: string
  amount: number
  image: string
  isComplete: boolean
  createdBy: object
  createdAt: Date
  updatedAt: Date
}

export interface DrawPrizeWithWinner {
  id: string
  drawId: string
  rank: number
  title: string
  amount: number
  image: string
  winners: DrawReport[]
  isComplete: boolean
  createdBy: object
  createdAt: Date
  updatedAt: Date
}

export interface CreateDrawPrize {
  slug: string
  title: string
  amount: number
  rank: number
  image: any
}

export interface UpdateDrawPrize {
  slug: string
  title: string
  amount: number
  rank: number
  image?: any
}
