import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
interface MenuItems {
  to: string;
  label: string;
}
const menuItems: MenuItems[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/author", label: "Author" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full bg-[#5D4B8C] px-4 py-8">
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
        <div>
          <Link
            to="/login"
            className="  rounded-full bg-[#98F9B3] px-4 py-2   text-black hover:bg-[#98F9B3]/90"
          >
            Sign In
          </Link>
        </div>
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
        <Button className="hidden md:block rounded-full bg-[#98F9B3] px-8 text-black hover:bg-[#98F9B3]/90">
          Sign In
        </Button>

        {/* TODO CART */}
      </div>
    </nav>
  );
}
