import { Heart, ShoppingCart, Star } from "lucide-react";
import { format } from "date-fns";
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
import { Book } from "@/types/Book";

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

export default function BookCard({ book, onAddToCart }: BookCardProps) {
  const {
    title,
    author,
    coverImage,
    description,
    publicationDate,
    genre,
    rating,
    publisher,
    inStock,
    price,
  } = book;

  const isOutOfStock = inStock === 0;
  console.log(rating);
  return (
    <Card className="w-[300px] overflow-hidden group mr-12">
      <div className="relative">
        {/* {discount && (
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
            <Badge variant="secondary" className="bg-black text-white">
              Summer Deal
            </Badge>
            <Badge variant="secondary" className="bg-white">
              -{discount}%
            </Badge>
          </div>
        )} */}

        <div className="overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
        <p className="mt-2 font-bold text-lg">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2 ">
        <Button className=" right-3  p-4 bg-muted border transition-colors hover:bg-muted ">
          <Heart className="w-5 h-5 text-black font-bold" />
        </Button>
        <Button className="w-full bg-[#5D4B8C] text-white" variant="outline">
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
