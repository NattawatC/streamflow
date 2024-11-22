import { Tenant } from "./tenant"
import { Estate } from "./estate"


export interface MockData {
  firstname: string
  lastname: string
  gender: string
  age: number
  phoneNumber: string
  roomNumber: number
  floorNumber: number
  BuildingNumber: number
  status: boolean
  estate: Estate
  tenant: Tenant[]
}
