import { Electricity } from './electricity'
import { Water } from './water'

export interface TenantDataInterface {
  firstname: string
  lastname: string
  age: number
  gender: string
  phoneNumber: string
  address: string
  province: string
  city: string
  zipCode: string
  building: number
  floor: number
  roomNumber: number
  floorNumber: number
  buildingNumber: number
  status: string
  yearOfStudy: number
  electricity: Electricity[]
  water: Water[]
}
