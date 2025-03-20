"use client";
import IntegrationSearchBar from "@/components/IntegrationSearchBar";
import SearchResult from "@/components/search/SearchResult";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText") ?? "";
  return (
    <>
      <IntegrationSearchBar searchValue={searchText} />
      <SearchResult searchValue={searchText} />
    </>
  );
}
