

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: string
  role: string
  companyName:string
  firstName:string
  lastName:string
  email:string
  status: string
  avatar: string
  company: string
  user:any
  country: string
  phone: string
  fullname: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: string
  img: string
  hours: string
  totalTask: string
  name: string
  endDate: string
  projectType: string
  description: string
  progress: any
  framework: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
  customer:string
  avatarColor?: ThemeColor
  avatarGroup: string[]

}

