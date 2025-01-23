import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPromoters, Promoters } from "@/slice/promoterSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
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

export default function Businesspromoters() {
  const dispatch = useDispatch<AppDispatch>();
  const { promoters } = useSelector((state: RootState) => state.promoters);
  const [fliterPromoters, setFliterPromoters] = useState<Promoters[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  useEffect(() => {
    dispatch(getPromoters());
  }, [dispatch]);

  useEffect(() => {
    setFliterPromoters(promoters);
  }, [promoters]);

  const handleFilterByLevel = (level: number) => {
    const filteredPromoters = promoters.filter((promoter) => promoter.level === level);
    setFliterPromoters(filteredPromoters);
  };

  const handleFilterBySearch = (input: string) => {
    const filteredPromoters = promoters.filter((promoter) => {
      const name = promoter.name.toLowerCase().includes(input.toLowerCase());
      const phone =
        promoter.phone &&
        promoter.phone.toString().toLowerCase().includes(input.toLowerCase());
      return name || phone;
    });
    setFliterPromoters(filteredPromoters);
  };

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

      <div className="flex justify-center items-center bg-blue-950 p-2 rounded-xl">
        <div>
          <Select onValueChange={(value) => handleFilterByLevel(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex items-center relative">
          <Search className="relative z-30 top-0 left-8" />
          <Input
            placeholder="Search Here"
            className="w-full px-8 py-2 pl-10 border border-gray-300 rounded-md"
            onChange={(e) => handleFilterBySearch(e.target.value)}
          />
        </div>
      </div>

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
                    <Button className="bg-blue-950">Accept Payment</Button>
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
