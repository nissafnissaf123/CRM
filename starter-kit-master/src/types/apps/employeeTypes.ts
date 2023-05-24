
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type EmployeesType = {
  id: string
  userId: string
  role: string
  department: any 
  phone:string
  email:string
  avatar: string
  country: string
  user: any
  fullname: string
  name: string
  username:string
  avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
  customer:string
  avatarColor?: ThemeColor
  avatarGroup: string[]

}

