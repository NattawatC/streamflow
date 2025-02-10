import { Tenant } from "./tenant"
import { Estate } from "./estate"
import { BankInfo } from "./bank"
import { ElectricityMeter } from "./electricityMeter"
import { WaterMeter } from "./waterMeter"

export interface OwnerDataInterface {
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
  bank: BankInfo[]
}

