import type { Coupon } from './coupon'
import type { Prize } from './prize'
import type { User } from './user'

export interface Campaign {
  id: String
  title: String
  prizeCap: Number
  type: String
  file: String
  createdBy: User
  isActive: true
  createdAt: Date
  updatedAt: Date
  prizes: Prize[]
  coupons: Coupon[]
}
