import { Tenant } from "./tenant"

export interface Estate {
  name: string
  address: string
  totalRoom: number
  totalBuilding: number
  totalFloor: number
  furnitureCost: number
  roomCharge: number
}

export interface MockData {
  firstname: string
  lastname: string
  gender: string
  roomNumber: number
  floorNumber: number
  BuildingNumber: number
  status: boolean
  estate: Estate
  tenant: Tenant[]
}
