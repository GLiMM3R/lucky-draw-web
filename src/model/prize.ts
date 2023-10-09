import type { User } from './user'

export interface Prize {
  id: String
  title: String
  amount: Number
  rank: Number
  leftAmount: Number
  image: String
  createdBy: User
  isActive: Boolean
  isDone: Boolean
  createdAt: Date
  updatedAt: Date
}
