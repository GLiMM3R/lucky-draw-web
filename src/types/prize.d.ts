declare interface Prize {
  id: string
  title: string
  amount: number
  rank: number
  leftAmount: number
  image: string
  createdBy: User
  isActive: Boolean
  isDone: Boolean
  createdAt: Date
  updatedAt: Date
}
