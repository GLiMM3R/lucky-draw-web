import type { User } from './user'

export interface Prize {
  id: String
  title: String
  amount: Number
  rank: Number
  image: String
  createdBy: User
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
}
