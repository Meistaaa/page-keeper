import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/types/Cart";
import { CartCard } from "../Cards/CartCard";

export default function CartPage() {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartPage must be used within a CartProvider");
  }
  const { cart, removeFromCart, updateQuantity } = cartContext;

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart?.items.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Button className="mt-4" onClick={() => navigate("/books/all-books")}>
            Browse Books
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {cart?.items.map((item) => (
            <CartCard
              key={item.book._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              handleRemove={removeFromCart}
              onSelect={toggleSelectItem}
              isSelected={selectedItems.some(
                (selected) => selected.book._id === item.book._id
              )}
            />
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-semibold">
              ${cart?.totalAmount.toFixed(2)}
            </p>
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
        </div>
      )}
    </div>
  );
}
