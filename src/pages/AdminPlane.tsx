import Plane from "@/components/Plane";
import { slidebarOption } from "@/constant";
import { useState } from "react";



export default function AdminPlane() {

  const [tab, setTab] = useState<string | "">("Dashboard");

  const toggleSidebar = (selectedTab:string) => {
    setTab(selectedTab);
  };
  return (
    <div className="bg-blue-950 ">
    <div className="container flex mx-auto py-9 ">
      {/* Sidebar */}
      <div className="flex items-start w-64">
      <div className="flex flex-col items-start  gap-32 w-full">
      <div className="">
        <img src="/logo.png" alt="" />
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        {slidebarOption.map((option,i)=>( 
        <div key={i} className="border-t border-b py-2 w-full">
           <div  className={`${tab===option.tab ? "bg-white text-blue-950":"bg-none text-white"} py-2 w-full text-xl  font-bold  p-2`} onClick={()=>toggleSidebar(option.tab)} >
           {option.tab}
         </div>
        </div>
        ))}
      </div>
    </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1  items-start justify-start bg-white py-20 px-10 rounded-3xl ">
        <Plane tab={tab}/>
      </div>
    </div>
  </div>
    
  )
}
