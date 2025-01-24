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

  // Fetch promoters data from the Redux store
  const { promoters } = useSelector((state: RootState) => state.promoters);

  // State to manage filtered promoters, current page, and items per page
  const [fliterPromoters, setFliterPromoters] = useState<Promoters[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  // Fetch promoters when the component is mounted
  useEffect(() => {
    dispatch(getPromoters());
  }, [dispatch]);

  // Update filtered promoters when the `promoters` state changes
  useEffect(() => {
    setFliterPromoters(promoters);
  }, [promoters]);

  // Filter promoters by level
  const handleFilterByLevel = (level: number) => {
    const filteredPromoters = promoters.filter((promoter) => promoter.level === level);
    setFliterPromoters(filteredPromoters);
  };

  // Filter promoters by search input (name or phone)
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

  // Pagination calculations
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentItems = fliterPromoters.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(fliterPromoters.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle pagination navigation
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

      {/* Filter and Search Section */}
      <div className="flex justify-center items-center bg-blue-950 p-2 rounded-xl">
        {/* Filter by Level */}
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
        {/* Search by Name or Phone */}
        <div className="w-full flex items-center relative">
          <Search className="relative z-30 top-0 left-8" />
          <Input
            placeholder="Search Here"
            className="w-full px-8 py-2 pl-10 border border-gray-300 rounded-md"
            onChange={(e) => handleFilterBySearch(e.target.value)}
          />
        </div>
      </div>

      {/* Promoters Table */}
      <div className="shadow-md bg-gray-100 rounded-xl w-full mt-8">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
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

      {/* Pagination */}
      <div className="mt-4 w-full flex items-center justify-between">
        {/* Items per Page */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-nowrap">Items per page: </h1>
          <p className="border p-2">{fliterPromoters.length}</p>
        </div>
        {/* Pagination Controls */}
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
