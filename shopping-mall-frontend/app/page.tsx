import Category from "./ui/Category";
import IntegrationSearchBar from "./ui/IntegrationSearchBar";
import RecentProducts from "./ui/RecentProducts";

const Home = () => {
  return (
    <>
      <IntegrationSearchBar />
      <Category />
      <RecentProducts />
    </>
  );
};

export default Home;
