import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Save } from "lucide-react";

interface CartItem {
  book: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  quantity: number;
}

interface CartCardProps {
  item: CartItem;
  onUpdateQuantity: (bookId: string, newQuantity: number) => void;
}

export function CartCard({ item, onUpdateQuantity }: CartCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isModified, setIsModified] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      setIsModified(true);
    }
  };

  const handleUpdate = () => {
    onUpdateQuantity(item.book._id, quantity);
    setIsModified(false);
  };

  return (
    <div
      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
      role="group"
      aria-label={`Cart item: ${item.book.title}`}
    >
      <div className="flex-shrink-0">
        <img
          src={item.book.coverImage}
          alt={`Cover of ${item.book.title}`}
          width={80}
          height={120}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.book.title}
        </h3>
        <p className="text-sm text-gray-600">{item.book.author}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center mt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(quantity - 1)}
              aria-label={`Decrease quantity of ${item.book.title}`}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                handleQuantityChange(parseInt(e.target.value, 10))
              }
              className="w-16 mx-2 text-center"
              aria-label={`Quantity of ${item.book.title}`}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label={`Increase quantity of ${item.book.title}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {isModified && (
            <Button
              size="sm"
              variant="default"
              onClick={handleUpdate}
              className="w-full bg-[#98F9B3] text-black hover:bg-[#98F9B3]/90"
              aria-label={`Update quantity of ${item.book.title}`}
            >
              <Save className="h-4 w-4 mr-2" />
              Update Quantity
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
