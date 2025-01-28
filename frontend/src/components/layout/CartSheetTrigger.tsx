import { Sheet, ShoppingCart } from "lucide-react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CartCard } from "../Cards/CartCard";
import { CartItem } from "@/types/Cart";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";

const CartSheetTrigger = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { cart, updateQuantity } = cartContext;
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const toggleSelectItem = (item: CartItem) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((selected) => selected.book._id === item.book._id)
        ? prevSelected.filter((selected) => selected.book._id !== item.book._id)
        : [...prevSelected, item]
    );
  };

  const handleOrderNow = () => {
    if (selectedItems.length > 0) {
      navigate("/order-now", { state: { items: selectedItems } });
      setSelectedItems([]);
    } else {
      alert("Please select at least one item to order.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-[#98F9B3]/20"
          aria-label="Open shopping cart"
        >
          <ShoppingCart color="#98F9B3" size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] bg-gray-100">
        <SheetHeader>
          <SheetTitle>Your Shopping Cart</SheetTitle>
        </SheetHeader>
        <div
          className="mt-6 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]"
          role="region"
          aria-label="Shopping cart items"
        >
          {cart?.items?.map((item: CartItem) => (
            <CartCard
              key={item.book._id}
              item={item}
              onUpdateQuantity={(bookId: string, newQuantity: number) =>
                updateQuantity(bookId, newQuantity)
              }
              onSelect={toggleSelectItem}
              isSelected={selectedItems.some(
                (selected) => selected.book._id === item.book._id
              )}
            />
          ))}
          {(!cart || cart.items.length === 0) && (
            <p className="text-center text-gray-600" role="status">
              Your cart is empty
            </p>
          )}
        </div>
        <div className="mt-4">
          <Button
            size="lg"
            variant="default"
            onClick={handleOrderNow}
            className="w-full bg-[#98F9B3] text-black hover:bg-[#98F9B3]/90"
          >
            Order Now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheetTrigger;
