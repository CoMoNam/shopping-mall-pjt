import IntegrationSearchBar from "@/components/IntegrationSearchBar";
import SearchResult from "@/components/search/SearchResult";
import { SearchRepository } from "@/repository/src/search/SearchRepository";
import { ProductListDto } from "@/types";
import { headers } from "next/headers";

export default async function SearchPage({
  searchValue,
}: {
  searchValue: string;
}) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  const searchRepository = new SearchRepository();
  const result = await searchRepository.getElkProductList(cookie, searchValue);
  const elkProductList: ProductListDto[] = result;
  return (
    <>
      <IntegrationSearchBar searchValue={searchValue} />
      <SearchResult elkProductList={elkProductList} />
    </>
  );
}
