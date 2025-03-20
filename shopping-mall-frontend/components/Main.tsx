import Category from "./Category";
import IntegrationSearchBar from "./IntegrationSearchBar";
import RecentProducts from "./RecentProducts";
import { ProductListDto } from "@/types";
import { MainRepository } from "@/repository/src/main/MainRepository";
import { headers } from "next/headers";

const Main = async () => {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";
  const mainRepository = new MainRepository();
  const response = await mainRepository.getRecentProductList(cookie);
  const recentProductList: ProductListDto[] = response;
  return (
    <>
      <IntegrationSearchBar searchValue={""} />
      <Category />
      <RecentProducts recentProductList={recentProductList} />
    </>
  );
};

export default Main;
