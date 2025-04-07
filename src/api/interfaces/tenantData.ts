import { Electricity } from "./electricity"
import { TenantDataInterface } from "./tenantDataInterface"

//status need to be fix: T/F or using as a string to check

//how to keep total cost of electricity and water

export const tenantData: TenantDataInterface = {
  firstname: "John",
  lastname: "Doe",
  age: 50,
  gender: "Female",
  phoneNumber: "999-999-9999",
  address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
  city: "New York",
  province: "New York",
  zipCode: "12345",
  building: 99,
  floor: 99,
  roomNumber: 1234,
  floorNumber: 1234,
  buildingNumber: 1234,
  status: "Payment Incomplete",
  yearOfStudy: 4,
  electricity: [
    {
      date: "01/10/2021",
      electricityUsage: 100,
      electricityCost: 1000,
    },
    {
      date: "02/10/2021",
      electricityUsage: 100,
      electricityCost: 1000,
    },
  ],
  water: [
    {
      date: "01/10/2021",
      waterUsage: 100,
      waterCost: 1000,
    },
    {
      date: "02/10/2021",
      waterUsage: 100,
      waterCost: 1000,
    },
  ],
}
