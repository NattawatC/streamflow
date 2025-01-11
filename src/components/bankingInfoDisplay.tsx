"use client"
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface BankingInfoDisplayProps {
    show: boolean;
    bankingInfo: { [key: string]: string[]};
    onDeleteBank: (bank: string) => void;
}


const BankingInfoDisplay: React.FC<BankingInfoDisplayProps> = ({ show, bankingInfo, onDeleteBank }) => {
    if (!show) return null;
    return (
        <div>
            {Object.entries(bankingInfo).map(([bank, accounts], index) => (
                <div
                key={index}
                className="bg-custom-pink flex flex-col gap-2 rounded-lg p-2 mb-4"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">{bank}</h3>
                        <button onClick={() => onDeleteBank(bank)} className="flex justify-end">
                            <RxCross2 size={20}/>
                        </button>   
                    </div>

                    {accounts.map((account, subIndex) => (
                        <p key={`${index}-${subIndex}`} className="text-sm">
                        Account Number: {account}
                        </p>
                 ))}
                </div>
            ))}
        </div>

      );

};

export default BankingInfoDisplay;