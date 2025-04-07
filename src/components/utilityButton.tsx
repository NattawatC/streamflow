import React from "react"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"

interface UtilityProps {
  title: string
  href: string
  color: string
  Icon: React.ElementType
  room_no: string | undefined
  estate_id?: number | undefined
}

const Utility: React.FunctionComponent<UtilityProps> = ({
  title,
  color,
  href,
  Icon,
  room_no,
  estate_id,
}) => {
  return (
    <>
      {/* Mobile */}
      <Link
        href={{
          pathname: `/tenant/${href}`,
          query: { id: estate_id, room_no },
        }}
        className={`block w-full h-full ${color} w-auto h-full p-4 justify-start rounded-md`}
      >
        <div className={`flex bg-${color} w-auto flex-col text-left`}>
          <div className="flex flex-col gap-2 text-left">
            <Icon
              size={24}
              className="text-white bg-black px-1 py-1 rounded-sm"
            />
            <p className="text-black font-bold text-sm">{title}</p>
          </div>
          <p className="text-black text-sm font-normal">see the details</p>
          <IoIosArrowRoundForward size={24} className="text-black" />
        </div>
      </Link>
    </>
  )
}

export default Utility
