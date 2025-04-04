import React from "react"
import { RxCross2 } from "react-icons/rx"
import { ScrollArea } from "./ui/scroll-area"
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
      <ScrollArea className="flex-grow-0 h-[200px] w-auto border rounded-md border-transparent">
        {Object.entries(bankingInfo).map(([bank, accounts]) =>
          Object.entries(accounts).map(
            ([accountId, { accountNumber, accountHolderName }]) => (
              <div
                key={accountId}
                className="bg-custom-pink flex flex-col gap-2 rounded-lg p-2 mb-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{bank}</h3>
                  <button
                    onClick={() => onDeleteAccount(bank, accountNumber)}
                    className="flex justify-end"
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>
                <p className="text-sm">Account Number: {accountNumber}</p>
                <p className="text-sm">Account Holder: {accountHolderName}</p>
              </div>
            )
          )
        )}
      </ScrollArea>
    </>
  )
}

export default BankingInfoDisplay
