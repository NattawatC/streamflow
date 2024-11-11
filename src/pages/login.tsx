"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainLayout } from "@/components/layout"
import { LoginOwnerForm } from "@/components/login/ownerForm"
import { LoginResidentForm } from "@/components/login/residentForm"

const login: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="font-subjectivity text-2xl">
            Welcome to StreamFlow, <br /> Sign In to Continue.
          </h1>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href={"/register"} className="underline">
              Create an account
            </Link>{" "}
            <br />
            It takes less than a minute.
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
            <LoginOwnerForm />
          </TabsContent>
          <TabsContent value="tenant">
            <LoginResidentForm />
          </TabsContent>
        </Tabs>
      </MainLayout>
    </>
  )
}
export default login
