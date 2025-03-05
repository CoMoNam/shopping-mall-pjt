import Category from "../components/Category";
import IntegrationSearchBar from "../components/IntegrationSearchBar";
import RecentProducts from "../components/RecentProducts";

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
