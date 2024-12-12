import type { User } from './user'

export interface CreateDraw {
  title: string
  prizeCap: number
  backgroundImage?: any
  loadingImage?: any
  device?: string
}

export interface UpdateDraw {
  id: string
  title?: string
  prizeCap?: number
  backgroundImage?: any
  loadingImage?: any
  device?: string
  isComplete?: boolean
}

export interface DuplicateDraw {
  id: string
  title: string
}

export interface Draw {
  id: string
  slug: string
  title: string
  prizeCap: number
  dataset: string
  backgroundImage: string
  loadingImage: string
  device: string
  isComplete: boolean
  createdBy: User
  createdAt: Date
  updatedAt: Date
}

export interface RequestDraw {
  slug: string
  prizeId: string
}
