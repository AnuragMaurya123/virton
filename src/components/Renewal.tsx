import { Button } from "./ui/button";


export default function Renewal() {
  return (
    <div className="w-full">
      <h1 className="text-4xl text-black font-bold mb-2">Dashboard</h1>
      <p className="text-base font-extralight text-[#101010] mb-4">01 - 25 March, 2020</p>
      <img src="/Stats.png" alt="" className="mb-6" />
    <h1 className="text-3xl font-semibold mb-2">Renew you Virton+ plan</h1>
    <p className="text-base">Your reseller plan expires soon. You have 9 remaining credits. Renew your plan to get<br/> uninterrupted services.</p>

      <div className="flex items-center justify-center text-center ">
      <div className="bg-violet-200 w-72 h-72 rounded-3xl overflow-hidden">
        <div className="bg-blue-950 p-2">
          <h1 className="text-4xl text-white ">Basic Plan</h1>
        </div>
        <h1 className="text-4xl my-6">₹ 590</h1>
        <p className="text-lg">Credits:	10</p>
        <Button className="bg-blue-950 mt-6">Accept Payment</Button>
      </div>
      </div>
     
    </div>
  )
}
