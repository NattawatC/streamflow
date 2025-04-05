"use client"
import { BiSolidBank } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { BankInfo } from "@/interfaces/bank"
import { useRouter } from "next/navigation"
import { logOutAction } from "@/actions/users"
import {
  getUserBanks,
  getUserEstate,
  getUserProfile,
} from "@/services/ownerService"
import { useEffect, useState, useTransition } from "react"
import Image from "next/image"

interface Props {
  userId: string | undefined
}

interface Bank {
  acct_no: string
  id: number
  name: string
  holder_name: string
}

export function ProfileOwnerCard({ userId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [bank, setBank] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [estate, setEstate] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [selectedBank, setSelectedBank] = useState<BankInfo | null>()

  // Fetch User's Profile information
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(userId)
        setProfile(userProfile)
      } catch (err) {
        setError("Failed to fetch bank data")
        console.error(err)
      }
    }

    fetchUserProfile()
  }, [userId])

  //   Fetch User's Estate information
  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        const userEstate = await getUserEstate(userId)
        const estateRecord =
          userEstate?.estates?.length > 0 ? userEstate.estates[0] : null
        setEstate(estateRecord)
      } catch (err) {
        setError("Failed to fetch estate data")
        console.error(err)
      }
    }

    fetchUserEstate()
  }, [userId])

  //   Fetch User's Bank informaiton
  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const bankData = await getUserBanks(userId)
        setBank(bankData)
      } catch (err) {
        setError("Failed to fetch bank data")
        console.error(err)
      }
    }

    fetchBankData()
  }, [userId])

  const handleSelect = (value: string) => {
    // Find the bank data by matching the name
    const bankData = bank.find((item: Bank) => item.name === value)

    if (bankData) {
      setSelectedBank({
        name: bankData.name,
        accountNumber: Array.isArray(bankData.acct_no)
          ? bankData.acct_no
          : [bankData.acct_no],
        holder_name: Array.isArray(bankData.holder_name)
          ? bankData.holder_name
          : [bankData.holder_name],
      })
    }
  }

  const logOut = () => {
    startTransition(async () => {
      const { errorMessage } = await logOutAction()
      if (errorMessage) {
        toast(errorMessage)
      } else {
        router.push("/login")
        toast("Successfully logged out")
      }
    })
  }

  return (
    <>
      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
        <div className="flex justify-end w-full">
          <Link href={"/owner/edit"}>
            <FiEdit size={24} />
          </Link>
        </div>
        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Basic Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col font-medium gap-2">
              <p>Name:</p>
              <p>Age:</p>
              <p>Gender:</p>
              <p>Tel:</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                {profile?.first_name} {profile?.last_name}
              </p>
              <p>{profile?.age}</p>
              <p>{profile?.gender}</p>
              <p>{profile?.phone_no}</p>
            </div>
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Estate Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col font-medium gap-2">
                <p>Name:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{estate?.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Address:</p>
              <p>
                {estate?.address}, {estate?.city}, {estate?.postal_code}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col font-medium gap-2">
                <p>Furniture Cost (Baht):</p>
                <p>Room Charge (Baht):</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{estate?.furniture_cost}</p>
                <p>{estate?.room_charge}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Utilities Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col font-medium gap-2">
              <p>Electricity (Baht):</p>
              <p>Water (Baht):</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>{estate?.electricity_cost}</p>
              <p>{estate?.water_cost}</p>
            </div>
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Banking Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col font-medium gap-2">
              <p>Select Bank</p>
            </div>
            <Select onValueChange={handleSelect}>
              <SelectTrigger
                className="flex w-full"
                icon={<BiSolidBank size={24} />}
              >
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {bank?.map((item: Bank) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Display Bank address */}
            {selectedBank && selectedBank.accountNumber && (
              <div className="flex flex-col gap-2">
                <p className="font-medium">Account Name</p>
                <p className="list-disc list-inside">
                  {(Array.isArray(selectedBank.holder_name)
                    ? selectedBank.holder_name
                    : [selectedBank.holder_name]
                  ).map((acc, index) => (
                    <li key={index}>{acc}</li>
                  ))}
                </p>
                <p className="font-medium">Account Number</p>
                <ul className="list-disc list-inside">
                  {(Array.isArray(selectedBank.accountNumber)
                    ? selectedBank.accountNumber
                    : [selectedBank.accountNumber]
                  ).map((acc, index) => (
                    <li key={index}>{acc}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">PromtPay</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            {profile?.qrcode_url ? (
              <Image
                src={profile.qrcode_url}
                width={300}
                height={300}
                alt="qrcode"
                priority
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                No QR code uploaded
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link href={"/owner"}>
          <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
            Return to Home
          </Button>
        </Link>

        <Button
          className="flex font-bold text-base text-black justify-center underline bg-transparent"
          onClick={logOut}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Log Out"}
        </Button>
      </div>
    </>
  )
}
