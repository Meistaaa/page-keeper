import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap gap-8 mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Page Keeper</h1>
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-400">
              Page Keeper is your trusted online bookstore. We offer a wide
              selection of books across various genres, from fiction to
              non-fiction, fantasy to mystery, and everything in between.
              Whether you're a bookworm or a casual reader, Page Keeper has
              something for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Our Address</h3>
            <p className="text-sm text-gray-400">
              789 Book Street, Suite 202
              <br />
              City, State, ZIP Code
              <br />
              Country
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mb-6">
          <div className="flex space-x-6">
            <Link
              to="/about"
              className="text-sm text-gray-400 hover:text-white"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-400 hover:text-white"
            >
              Contact
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm text-gray-400 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com/pagekeeper"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>{' '}
            </a>
            <a
              href="https://twitter.com/pagekeeper"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>{' '}
            </a>
            <a
              href="https://instagram.com/pagekeeper"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>{' '}
            </a>
            <a
              href="https://linkedin.com/company/pagekeeper"
              className="text-gray-400 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>{' '}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Page Keeper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
