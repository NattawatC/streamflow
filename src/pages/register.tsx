"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout"
import { RegOwnerForm } from "@/components/register/ownerForm"
import { RegResidentForm } from "@/components/register/residentForm"

const register: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="font-subjectivity text-2xl">Create Your Account</h1>
          <p className="text-sm">
            Already has an account?{" "}
            <Link href={"/login"} className="underline">
              Login
            </Link>
          </p>
        </div>

        <Tabs defaultValue="owner" className="flex flex-col w-auto gap-10">
          <TabsList className="w-full text-xl justify-between">
            <TabsTrigger className="w-full" value="owner">
              Owner
            </TabsTrigger>
            <TabsTrigger className="w-full" value="tenant">
              Tenant
            </TabsTrigger>
          </TabsList>
          <TabsContent value="owner">
            <RegOwnerForm />
          </TabsContent>
          <TabsContent value="tenant">
            <RegResidentForm />
          </TabsContent>
        </Tabs>
      </MainLayout>
    </>
  )
}
export default register
