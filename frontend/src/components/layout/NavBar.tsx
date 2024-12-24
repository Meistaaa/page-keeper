import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Menu, ShoppingCart } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { Cart } from "@/types/Cart";
import { CartCard } from "../Cards/CartCard";
import { useToast } from "@/hooks/use-toast";
interface MenuItems {
  to: string;
  label: string;
}
const menuItems: MenuItems[] = [
  { to: "/", label: "Home" },
  { to: "/your-orders", label: " Orders" },
  { to: "/books", label: " Books" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const userContext = useContext(UserContext);
  const { toast } = useToast();

  if (!userContext) {
    throw new Error("UpdateUserComponent must be used within a UserProvider");
  }

  const { user, setUser } = userContext;
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("object");
        toast({ title: "User Logged Out Successfully" });
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="w-full bg-[#5D4B8C] px-4 py-8 md:px-6 lg:px-8">
      {/* FOR SMALL SCREENS  */}
      <div className="md:hidden mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu color="#98F9B3" size={20} className=" cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#5D4B8C] text-white w-64">
              <SheetHeader>
                <h2 className="text-xl font-semibold">Menu</h2>
              </SheetHeader>
              <div className="mt-4 flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block  rounded px-4 py-2 transition-colors ${
                      location.pathname === item.to
                        ? "bg-[#98F9B3] text-black"
                        : "text-white hover:bg-[#98F9B3]/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Link
            to="/"
            className="flex items-center text-xl md:text-xl font-semibold"
          >
            <span className="text-[#98F9B3]">Page</span>
            <span className="text-white">Keeper</span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleLogout}
              className="  rounded-full bg-[#98F9B3] px-4 py-2   text-black hover:bg-[#98F9B3]/90"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>
            <CartSheetTrigger />
          </div>
        ) : (
          <Link
            to="/login"
            className="  rounded-full bg-[#98F9B3] px-4 py-2   text-black hover:bg-[#98F9B3]/90"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Navigation Links for Larger Screens */}

      <div className="hidden md:flex mx-auto  max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-semibold  ">
          <span className="text-[#98F9B3]">Page</span>
          <span className="text-white">Keeper</span>
        </Link>
        <div className="hidden  md:flex items-center justify-between text-xl space-x-8 font-semibold tracking-wide">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`transition-colors hover:text-white/80 ${
                location.pathname === item.to ? "text-[#98F9B3]" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleLogout}
              className="  rounded-full bg-[#98F9B3] px-4 py-2   text-black hover:bg-[#98F9B3]/90"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>
            <CartSheetTrigger />
          </div>
        ) : (
          <Link
            to="/login"
            className="  rounded-full bg-[#98F9B3] px-4 py-2   text-black hover:bg-[#98F9B3]/90"
          >
            Sign in
          </Link>
        )}

        {/* TODO CART */}
      </div>
    </nav>
  );
}

export function CartSheetTrigger() {
  const [cart, setCart] = useState<Cart | null>(null);
  const { toast } = useToast();
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/api/cart/get-cart`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setCart(res.data.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (bookId: string, quantity: number) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URI}/api/cart/update-cart/${bookId}`,
        { quantity },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        await fetchCart();
        toast({ title: "Cart updated successfully" });
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({ title: "Failed to update cart. Please try again." });
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
          {cart?.items?.map((item) => (
            <CartCard
              key={item.book._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          {(!cart || cart.items.length === 0) && (
            <p className="text-center text-gray-600" role="status">
              Your cart is empty
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
