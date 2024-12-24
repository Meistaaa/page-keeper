import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#5D4B8C] px-4 py-8 md:px-6 lg:px-8 text-white">
      <div className="flex mx-auto  max-w-7xl items-center justify-center">
        <div className="flex flex-wrap  mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Page Keeper</h1>
          </div>

          <p className="text-sm ">
            Page Keeper is your trusted online bookstore. We offer a wide
            selection of books across various genres, from fiction to
            non-fiction, fantasy to mystery, and everything in between. Whether
            you're a bookworm or a casual reader, Page Keeper has something for
            everyone.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Our Address</h3>
            <p className="text-sm ">
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
            <Link to="/about" className="text-sm  hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-sm  hover:text-white">
              Contact
            </Link>
            <Link to="/privacy-policy" className="text-sm  hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm  hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com/pagekeeper"
              className=" hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>{" "}
            </a>
            <a
              href="https://twitter.com/pagekeeper"
              className=" hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>{" "}
            </a>
            <a
              href="https://instagram.com/pagekeeper"
              className=" hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>{" "}
            </a>
            <a
              href="https://linkedin.com/company/pagekeeper"
              className=" hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>{" "}
            </a>
          </div>
        </div>

        <div className="border-t  pt-4 mt-6 text-center text-sm ">
          &copy; {new Date().getFullYear()} Page Keeper. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
