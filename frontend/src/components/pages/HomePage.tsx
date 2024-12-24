import Category, { BookCategory } from "../Cards/Categories";
import BestSellingBooks from "../layout/BestSellingBooks";
import Hero from "../layout/Hero";

const bookCategories: BookCategory[] = [
  "Fiction",
  "Non-fiction",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Self-help",
  "Other",
];
const HomePage = () => {
  const handleCategoryChange = (
    category: (typeof bookCategories)[number] | null
  ) => {
    console.log("Selected category:", category);
  };
  return (
    <div>
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <Category
          categories={bookCategories}
          onCategoryChange={handleCategoryChange}
        />
        <BestSellingBooks />
      </main>
    </div>
  );
};

export default HomePage;
