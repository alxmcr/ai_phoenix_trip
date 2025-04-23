"use client";

import React from "react";
import { ReviewData } from "@/app/types/db/review";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Search,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function ReviewsPaginatedSection() {
  const [reviews, setReviews] = React.useState<ReviewData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [transportFilter, setTransportFilter] = React.useState("all");
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const pageSize = 6;

  // Get transport mode icon
  const getTransportIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "airplane":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "train":
        return <Truck className="h-4 w-4 text-green-500" />;
      case "bus":
        return <Truck className="h-4 w-4 text-orange-500" />;
      case "ferry":
        return <Truck className="h-4 w-4 text-purple-500" />;
      default:
        return <Truck className="h-4 w-4 text-gray-500" />;
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Handle transport filter change
  const handleTransportFilterChange = (value: string) => {
    setTransportFilter(value);
  };

  // Fetch reviews on component mount and when page changes
  React.useEffect(() => {
    // Fetch reviews with pagination and filters
    const fetchReviews = async (
      currentPageF: number,
      pageSizeF: number,
      searchQueryF: string,
      transportFilterF: string
    ) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPageF.toString(),
          pageSize: pageSizeF.toString(),
          search: searchQueryF,
          transport: transportFilterF,
        });

        const response = await fetch(`/api/reviews?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews(currentPage, pageSize, searchQuery, transportFilter);
  }, [currentPage, pageSize, searchQuery, transportFilter]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              Browse and search through customer reviews
            </CardDescription>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reviews..."
                className="pl-8 sm:w-[200px] md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Select
              value={transportFilter}
              onValueChange={handleTransportFilterChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Transport mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All modes</SelectItem>
                <SelectItem value="airplane">Airplane</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="ferry">Ferry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <Card key={review.review_id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-primary/10 p-1">
                          {getTransportIcon(review.transport_mode)}
                        </div>
                        <CardTitle className="text-base">
                          {review.company_name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold">{review.rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <CardDescription>
                        {review.email.split("@")[0]}
                      </CardDescription>
                      <Badge variant="outline">{review.trip_type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {review.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3 text-red-500" />
                        {review.origin} to {review.destination}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 text-blue-500" />
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      asChild
                    >
                      <Link href={`/reviews/${review.review_id}`}>
                        See more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
