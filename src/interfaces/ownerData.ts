import { OwnerDataInterface } from "./ownerDataInterface"

export const ownerData: OwnerDataInterface = {
  firstname: "Nattawat",
  lastname: "Chaokraisith",
  gender: "Male",
  age: 56,
  phoneNumber: "000-000-0000",
  roomNumber: 123,
  floorNumber: 123,
  BuildingNumber: 123,
  status: false,
  estate: {
    name: "The Home Ladkrabang",
    address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
    city: "Bangkok",
    zipCode: "10160",
    totalRoom: 99,
    totalBuilding: 99,
    totalFloor: 99,
    furnitureCost: 9999,
    roomCharge: 9999,
    electricityCost: 6,
    waterCost: 17,
    electricityMeter: [
      {
        floorNumber: 1,
        roomNumber: 101,
        meterNumber: 101,
        elecUsage: 99,
      },
      {
        floorNumber: 1,
        roomNumber: 102,
        meterNumber: 102,
        elecUsage: 99,
      },
      {
        floorNumber: 2,
        roomNumber: 202,
        meterNumber: 202,
        elecUsage: 99,
      },
    ],
    waterMeter: [
      {
        floorNumber: 1,
        roomNumber: 101,
        meterNumber: 101,
        waterUsage: 88,
      },
      {
        floorNumber: 1,
        roomNumber: 102,
        meterNumber: 102,
        waterUsage: 88,
      },
      {
        floorNumber: 2,
        roomNumber: 202,
        meterNumber: 202,
        waterUsage: 88,
      },
    ],
  },
  tenant: [
    {
      firstname: "John",
      lastname: "Clark",
      room: 101,
      pStatus: false,
      rStatus: true,
    },
    {
      firstname: "Sarah",
      lastname: "Shelby",
      room: 102,
      pStatus: true,
      rStatus: false,
    },
    {
      firstname: "Tomb",
      lastname: "Raider",
      room: 103,
      pStatus: true,
      rStatus: true,
    },
  ],
  bank: [
    {
      name: "Bank of America",
      accountNumber: ["123456789", "987654321"],
    },
    {
      name: "Chase Bank",
      accountNumber: "987654321",
    },
    {
      name: "Wells Fargo",
      accountNumber: "456789123",
    },
    {
      name: "Citi Bank",
      accountNumber: "789123456",
    },
    {
      name: "HSBC",
      accountNumber: "321987654",
    },
  ],
}
