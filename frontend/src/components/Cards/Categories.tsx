import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type BookCategory =
  | "Fiction"
  | "Non-fiction"
  | "Science Fiction"
  | "Mystery"
  | "Romance"
  | "Thriller"
  | "Biography"
  | "History"
  | "Self-help"
  | "Other";

interface CategoryProps {
  categories: BookCategory[];
  onCategoryChange: (category: BookCategory | null) => void;
}

export default function Category({
  categories,
  onCategoryChange,
}: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | null>(
    null
  );

  const handleCategoryClick = (category: BookCategory) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      onCategoryChange(null);
    } else {
      setSelectedCategory(category);
      onCategoryChange(category);
    }
  };

  return (
    <div className="my-16  space-y-12">
      <div className="flex justify-between items-center max-w-7xl  mx-auto">
        <h1 className="text-3xl font-bold ">Categories</h1>
        <a
          href="/books"
          className="text-primary hover:underline inline-flex items-center"
        >
          View All
          <span className="ml-1">→</span>
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-7xl mx-auto ">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className={cn(
              "h-auto rounded-full px-6 py-4 text-lg font-semibold w-full",
              selectedCategory === category
                ? "bg-[#E6E4F1] hover:bg-[#E6E4F1] text-black border-[#E6E4F1]"
                : "bg-white hover:bg-gray-50"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
