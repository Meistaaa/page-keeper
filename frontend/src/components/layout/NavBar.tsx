import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-background shadow-md">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold">PAGE KEEPER</h1>
      </div>

      <div className="flex space-x-6">
        <Link
          to="/about"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          About
        </Link>

        <Link
          to="/products"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Products
        </Link>
        <Link
          to="/categories"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Categories
        </Link>
        <Link
          to="/new-arrivals"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          New Arrivals
        </Link>

        <Link
          to="/contact"
          className="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Contact
        </Link>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="text-sm">
          Login
        </Button>
        <Button variant="outline" className="text-sm">
          Signup
        </Button>
      </div>
    </nav>
  );
}
