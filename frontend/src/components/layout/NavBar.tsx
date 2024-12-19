import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white ">
      {/* Logo */}
      <div className="text-xl font-bold">Page Keeper</div>

      {/* Links */}
      <div className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </div>

      {/* Cart */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger>
          <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600">
            Cart
          </button>
        </SidebarTrigger>

        <button className="bg-green-500 p-2 rounded text-white hover:bg-green-600">
          Login
        </button>
      </div>
    </nav>
  );
}
