
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
  const { promoters } = useSelector((state: RootState) => state.promoters);
  const [fliterPromoters, setFliterPromoters] = useState<Promoters[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  useEffect(() => {
    dispatch(getPromoters());
  }, [dispatch]);

  useEffect(() => {
    if (promoters) {
      const activePromoters=promoters.filter((promoter)=>promoter.status === true)
      setFliterPromoters(activePromoters);
    }
   
  }, [promoters]);



  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = fliterPromoters.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(fliterPromoters.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePagination = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl text-black font-bold mb-2">Dashboard</h1>
      <p className="text-base font-extralight text-[#101010] mb-4">01 - 25 March, 2020</p>
      <img src="/Stats.png" alt="" className="mb-12" />


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
                    <Button variant={"outline"} className="ml-4">Download</Button>
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

      <div className="mt-4 w-full flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-nowrap">Items per page: </h1>
          <p className="border p-2">{fliterPromoters.length}</p>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePagination(currentPage - 1)}
            />
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink onClick={() => handlePagination(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePagination(currentPage + 1)} 
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
