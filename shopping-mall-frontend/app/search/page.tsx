import SearchPage from "@/components/search/SearchPage";

export const dynamic = "force-dynamic";

export default function Search({
  searchParams,
}: {
  searchParams?: { searchText?: string };
}) {
  const searchValue = searchParams?.searchText ?? "";
  return <SearchPage searchValue={searchValue} />;
}
