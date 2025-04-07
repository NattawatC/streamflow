import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Receipt from "@/components/receipt"
import BankInfo from "@/components/bankInfo"
import { ownerData } from "@/api/interfaces/ownerData"

const data = {
  startDate: "2021/10/01",
  endDate: "2021/10/30",
  TotalCost: 9999,
  electricity: {
    used: 100,
    cost: 1000,
    total: 10000,
  },
  water: {
    used: 100,
    cost: 1000,
    total: 10000,
  },
  furniture: 3000,
  roomCharge: 3000,
}

const payment: NextPage = () => {
  return (
    <MainLayout className="flex flex-col gap-8 items-center">
      <h1 className="flex text-2xl font-bold justify-center">Payment</h1>
      <Dialog>
        <DialogTrigger className="underline">
          Click here view Receipt
        </DialogTrigger>
        <DialogContent className="bg-white" color="black">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle></DialogTitle>
            <DialogDescription className="text-black">
              <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
                <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap font-medium">
                      Total Cost (Baht)
                    </p>
                    <div className="flex w-full items-center">
                      <Separator className="h-[2px] rounded-sm w-full justify-center" />
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center font-bold">
                    <p className="font-bold text-2xl">{data.TotalCost}</p>
                  </div>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="flex-grow-0 w-full"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex gap-3 font-medium w-full text-base items-center justify-center">
                      View more Details
                    </AccordionTrigger>
                    <AccordionContent className="gap-4 p-0 pb-4">
                      <Receipt
                        startDate={data.startDate}
                        endDate={data.endDate}
                        eUsed={data.electricity.used}
                        eCost={data.electricity.cost}
                        wUsed={data.water.used}
                        wCost={data.water.cost}
                        furniture={data.furniture}
                        roomCharge={data.roomCharge}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <BankInfo bank={ownerData.bank} />

      <div>
        <p>The Receipt</p>
      </div>
    </MainLayout>
  )
}

export default payment
