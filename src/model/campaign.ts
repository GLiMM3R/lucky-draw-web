import type { Coupon } from './coupon'
import type { Prize } from './prize'

export interface Campaign {
  id: String
  title: String
  prizeCap: Number
  campaignType: String
  createdBy: {}
  isActive: true
  createdAt: Date
  updatedAt: Date
  prizes: Prize[]
  coupon: Coupon[]
}
