import { ElectricityMeter } from "./electricityMeter"
import { WaterMeter } from "./waterMeter"

export interface Estate {
  name: string
  address: string
  city: string
  zipCode: string
  totalRoom: number
  totalBuilding: number
  totalFloor: number
  furnitureCost: number
  roomCharge: number
  waterCost: number
  electricityCost: number
  electricityMeter: ElectricityMeter[]
  waterMeter: WaterMeter[]
}
