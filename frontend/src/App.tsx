import NavBar from '../src/components/layout/NavBar'; // Adjust the path if necessary
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from "./components/NavBar";  // Path to your NavBar component
// import About from "./pages/About";         // Example About page
// import Contact from "./pages/Contact";     // Example Contact page
// import Home from "./pages/Home";           // Example Home page
// import Login from "./pages/Login";         // Example Login page
// import Signup from "./pages/Signup";       // Example Signup page
// import Products from "./pages/Products";   // Example Products page
// import Categories from "./pages/Categories"; // Example Categories page
// import NewArrivals from "./pages/NewArrivals"; // Example New Arrivals page

function App() {
  return (
    <Router>
      <NavBar />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
      </Routes> */}
    </Router>
  );
}

export default App;
