import { Separator } from "./ui/separator"

interface Tenant {
  id: number
  first_name: string
  last_name: string
  age: number
  gender: string
  year_of_study: number
  phone_number: string
  building_no: string
  floor_no: string
  room_no: string
}

interface ResultCardProps {
  tenant: Tenant
}

export default function ResultCard({ tenant }: ResultCardProps) {
  return (
    <>
      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Basic Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col font-medium gap-2">
              <p>Name:</p>
              <p>Age:</p>
              <p>Gender:</p>
              <p>Phone Number:</p>
              <p>Year Of Study:</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                {tenant.first_name} {tenant.last_name}
              </p>
              <p>{tenant.age}</p>
              <p>{tenant.gender}</p>
              <p>{tenant.phone_number}</p>
              <p>{tenant.year_of_study}</p>
            </div>
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Room Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col font-medium gap-2">
              <p>Building:</p>
              <p>Level/Floor:</p>
              <p>Room Numnber:</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{tenant.building_no}</p>
              <p>{tenant.floor_no}</p>
              <p>{tenant.room_no}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
