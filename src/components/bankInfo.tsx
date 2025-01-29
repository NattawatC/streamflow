import React from "react"
import { Separator } from "./ui/separator"

interface BankProps {
  qrCode?: Blob
  bank: {
    name: string
    accountNumber: string
  }[]
}

const BankInfo: React.FunctionComponent<BankProps> = ({ qrCode, bank }) => {
  return (
    <>
      <div className="flex flex-col w-full gap-5 bg-custom-gray-background rounded-md p-4">
        {/* QR Code Section */}
        <div className="flex flex-col gap-3 items-center">
          <p>Scan QR Code to Pay</p>
          <p>(Image)</p>
          {/* <img src={qrCode} alt="QR Code" className="w-32 h-32" /> */}
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        {/* Bank Details Section */}
        <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          {bank.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <p className="font-medium">{item.name}</p>
              <p>Account Number: {item.accountNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BankInfo
