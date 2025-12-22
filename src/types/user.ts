export interface UserInfo {
  id: string
  memberId: number
  uuid: string | null
  name: string
  email: string
  image?: string | null
  createdAt: Date
  updatedAt: Date
}
