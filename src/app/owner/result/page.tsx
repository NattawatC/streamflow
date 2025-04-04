"use client"
import { MainLayout } from "@/components/layout"
import ResultCard from "@/components/resultCard"
import { Button } from "@/components/ui/button"
import supabase from "@/config/supabaseClient"
import { NextPage } from "next"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Tenant {
  id: number
  first_name: string
  last_name: string
  age: string
  gender: string
  year_of_study: number
  phone_number: string
  building_no: string
  floor_no: string
  room_no: string
}

const result: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [tenant, setTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    const fetchTenant = async () => {
      if (!id) return
      const { data, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching tenant:", error.message)
      } else {
        setTenant(data)
      }
    }

    fetchTenant()
  }, [id])

  return (
    <>
      <MainLayout className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Olá, Newcomer</h1>
        {tenant ? (
          <ResultCard tenant={tenant} />
        ) : (
          <p className="text-gray-500">Loading tenant data...</p>
        )}

        <Link href={"/owner"}>
          <Button className="bg-custom-green text-black w-full text-base font-bold">
            Return to Home
          </Button>
        </Link>
      </MainLayout>
    </>
  )
}

export default result
