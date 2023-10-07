import type { User } from './user'

export interface Coupon {
  id: string
  name: string
  phone: string
  campaignId: string
  createdBy: User
  isNew: Boolean
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
}
