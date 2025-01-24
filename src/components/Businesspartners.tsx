
import { getPartners } from "@/slice/partnerSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";


export default function Businesspartners() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, partners } = useSelector(
    (state: RootState) => state.partners
  );

  useEffect(() => {
    dispatch(getPartners())
  }, [dispatch])

  if (error) {
    return <div className="flex items-center justify-center">
      Something Want Wrong
    </div>
  }
  if (loading) {
    return <Loader />
  }
  if (!partners) {
    return <div className="flex items-center justify-center">
      Data Not Found
    </div>
  }


  return (
    <div className="w-full ">
      <h1 className="text-4xl text-black font-bold mb-2 ">Dashboard</h1>
      <p className="text-base font-extralight text-[#101010] mb-4">01 - 25 March, 2020</p>
      <img src="/Stats.png" alt="" className="mb-12" />
      <div className="shadow-md bg-gray-100 rounded-xl w-full ">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Reference Id</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {
            partners.map((partner) => (
              <TableBody key={partner._id}>
                <TableRow>
                  <TableCell>{partner.name}</TableCell>
                  <TableCell>{partner.status === true ? "active" : "inactive"}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell>{partner.Phone}</TableCell>
                  <TableCell>{partner._id}</TableCell>
                  <TableCell>{partner.Paid === true ? (<Button className="bg-blue-950">Paid</Button>) : (<Button className="bg-blue-950">Unpaid</Button>)}</TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
      </div>

    </div>
  )
}

