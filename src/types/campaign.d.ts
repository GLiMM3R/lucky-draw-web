declare interface Campaign {
  id: string
  title: string
  prizeCap: number
  type: string
  file: string
  createdBy: User
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
  prizes: Prize[]
  coupons: Coupon[]
}
