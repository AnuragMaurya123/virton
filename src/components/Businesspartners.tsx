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
} from "@/components/ui/table";
import { Button } from "./ui/button";

export default function Businesspartners() {
  // Initialize dispatch to trigger Redux actions
  const dispatch = useDispatch<AppDispatch>();

  // Extract partner-related state from the Redux store
  const { error, loading, partners } = useSelector(
    (state: RootState) => state.partners
  );

  // Fetch partners when the component is mounted
  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  // Render error message if fetching data fails
  if (error) {
    return (
      <div className="flex items-center justify-center">
        Something Went Wrong
      </div>
    );
  }

  // Render loader while fetching data
  if (loading) {
    return <Loader />;
  }

  // Render fallback message if no partners data is available
  if (!partners) {
    return (
      <div className="flex items-center justify-center">
        Data Not Found
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Dashboard Header */}
      <h1 className="text-4xl text-black font-bold mb-2">Dashboard</h1>
      <p className="text-base font-extralight text-[#101010] mb-4">
        01 - 25 March, 2020
      </p>
      <img src="/Stats.png" alt="Stats" className="mb-12" />

      {/* Partners Table */}
      <div className="shadow-md bg-gray-100 rounded-xl w-full">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Reference Id</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          {partners.map((partner) => (
            <TableBody key={partner._id}>
              <TableRow>
                {/* Partner Details */}
                <TableCell>{partner.name}</TableCell>
                <TableCell>
                  {partner.status === true ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>{partner.Phone}</TableCell>
                <TableCell>{partner._id}</TableCell>
                <TableCell>
                  {/* Paid/Unpaid Status */}
                  {partner.Paid === true ? (
                    <Button className="bg-blue-950">Paid</Button>
                  ) : (
                    <Button className="bg-blue-950">Unpaid</Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>
  );
}
