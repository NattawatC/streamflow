import React from "react"
import { RxCross2 } from "react-icons/rx"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"
interface BankingInfoDisplayProps {
  bankingInfo: {
    [key: string]: {
      [accountId: string]: { accountNumber: string; accountHolderName: string }
    }
  }
  onDeleteAccount: (bank: string, accountId: string) => void
}

const BankingInfoDisplay: React.FC<BankingInfoDisplayProps> = ({
  bankingInfo,
  onDeleteAccount,
}) => {
  if (Object.keys(bankingInfo).length === 0) return null

  return (
    <>
      <div className="flex flex-col items-center bg-custom-gray-background p-2 rounded-lg">
        <ScrollArea className="flex-grow-0 h-[120px] w-full border rounded-md border-transparent">
          {Object.entries(bankingInfo).map(([bank, accounts]) =>
            Object.entries(accounts).map(
              ([accountId, { accountNumber, accountHolderName }]) => (
                <div
                  key={accountId}
                  className="bg-custom-pink flex flex-col gap-2 rounded-lg p-2 mb-3"
                >
                  <div className="flex items-center justify-between h-6">
                    <h3 className="text-lg font-bold">{bank}</h3>
                    <Button
                      onClick={() => onDeleteAccount(bank, accountNumber)}
                      className="flex justify-end bg-transparent p-0 text-black"
                      type="button"
                    >
                      <RxCross2 size={20} />
                    </Button>
                  </div>
                  <p className="text-sm">Account Number: {accountNumber}</p>
                  <p className="text-sm">Account Holder: {accountHolderName}</p>
                </div>
              )
            )
          )}
        </ScrollArea>
      </div>
    </>
  )
}

export default BankingInfoDisplay
