"use client";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface BankingInfoDisplayProps {
    bankingInfo: { [key: string]: { [accountId: string]: string } };
    onDeleteAccount: (bank: string, accountId: string) => void;
}

const BankingInfoDisplay: React.FC<BankingInfoDisplayProps> = ({ bankingInfo, onDeleteAccount }) => {
    if (Object.keys(bankingInfo).length === 0) return null;

    return (
        <>
            {Object.entries(bankingInfo).map(([bank, accounts]) => (
                Object.entries(accounts).map(([accountId, accountNumber]) => (
                    <div
                        key={accountId}
                        className="bg-custom-pink flex flex-col gap-2 rounded-lg p-2 mb-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">{bank}</h3>
                            <button onClick={() => onDeleteAccount(bank, accountId)} className="flex justify-end">
                                <RxCross2 size={20} />
                            </button>
                        </div>
                        <p className="text-sm">Account Number: {accountNumber}</p>
                    </div>
                ))
            ))}
        </>
    );
};

export default BankingInfoDisplay;
