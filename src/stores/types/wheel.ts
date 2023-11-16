import { partial } from 'lodash'
import type { User } from './user'

export interface CreateWheel {
  title: string
  baseIcon?: any
}

export interface UpdateWheel {
  id: string
  title?: string
  baseIcon?: any
  isComplete?: boolean
}

export interface DuplicateWheel {
  id: string
  title: string
}

export interface Wheel {
  id: string
  slug: string
  title: string
  baseIcon: string
  isComplete: boolean
  createdBy: User
  createdAt: Date
  updatedAt: Date
}

export interface WheelWithPrize {
  id: string
  slug: string
  title: string
  baseIcon: string
  isComplete: boolean
  createdBy: User
  createdAt: Date
  updatedAt: Date
}
