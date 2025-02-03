import Category from "../Cards/Categories";
import BestSellingBooks from "../layout/BestSellingBooks";
import Hero from "../layout/Hero";
import RecentlySoldBooks from "../layout/RecentlySoldBooks";
import TrendingBooks from "../layout/TrendingBooks";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <Category />
        <BestSellingBooks />
        <TrendingBooks />
        <RecentlySoldBooks />
      </main>
    </div>
  );
};

export default HomePage;
