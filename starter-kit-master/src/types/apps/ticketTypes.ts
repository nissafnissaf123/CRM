
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'


export type TicketsType = {
  id: string
  userId: string
  lastName:string
  status: string
  client: any       
  clientId: string
  company: string
  project: any
  fullname: string
  user: any
  avatar: string
  name: string
  employee: any
  username: string
  emergencyLevel:string
  createdAt:string
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

