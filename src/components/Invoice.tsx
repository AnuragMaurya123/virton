import { getPromoters, Promoters } from "@/slice/promoterSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Invoice() {
  const dispatch = useDispatch<AppDispatch>();

  // Extract promoters data from the Redux store
  const { promoters } = useSelector((state: RootState) => state.promoters);

  // Local state to store filtered promoters and pagination information
  const [fliterPromoters, setFliterPromoters] = useState<Promoters[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  // Fetch promoters data when the component is mounted
  useEffect(() => {
    dispatch(getPromoters());
  }, [dispatch]);

  // Filter active promoters whenever the promoters list changes
  useEffect(() => {
    if (promoters) {
      const activePromoters = promoters.filter((promoter) => promoter.status === true);
      setFliterPromoters(activePromoters);
    }
  }, [promoters]);

  // Pagination logic: determine the current items to display
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = fliterPromoters.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(fliterPromoters.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle page changes for pagination
  const handlePagination = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full">
      {/* Dashboard Header */}
      <h1 className="text-4xl text-black font-bold mb-2">Dashboard</h1>
      <p className="text-base font-extralight text-[#101010] mb-4">01 - 25 March, 2020</p>
      <img src="/Stats.png" alt="Stats" className="mb-12" />

      {/* Promoters Table */}
      <div className="shadow-md bg-gray-100 rounded-xl w-full mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((promoter) => (
              <TableRow key={promoter._id}>
                <TableCell>{promoter.name}</TableCell>
                <TableCell>{promoter.phone}</TableCell>
                <TableCell>{promoter.amount}</TableCell>
                <TableCell>
                  {promoter.status ? (
                    <>
                      <Button className="bg-blue-950">Invoice</Button>
                      <Button variant={"outline"} className="ml-4">
                        Download
                      </Button>
                    </>
                  ) : (
                    "Inactive"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 w-full flex items-center justify-between">
        {/* Items per page */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-nowrap">Items per page: </h1>
          <p className="border p-2">{fliterPromoters.length}</p>
        </div>

        {/* Pagination controls */}
        <Pagination>
          <PaginationContent>
            <PaginationPrevious onClick={() => handlePagination(currentPage - 1)} />
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePagination(page)}>{page}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext onClick={() => handlePagination(currentPage + 1)} />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
