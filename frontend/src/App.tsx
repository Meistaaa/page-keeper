import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";
import { LoginPage } from "./components/pages/LoginPage";
import { UserProvider } from "./context/UserContext";
import BooksPage from "./components/pages/BooksPage";
import BookDetailsPage from "./components/pages/BookDetailsPage";
import { CartProvider } from "./context/CartContext";
import OrderPage from "./components/pages/OrderPage";
import YourOrders from "./components/pages/YourOrders";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import SignupPage from "./components/pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TrendingBooksPage from "./components/pages/TrendingBooksPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Routes>
            {/* Routes with Layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            {/* Routes with Layout */}
            <Route
              path="/books/trending-books"
              element={
                <Layout>
                  <TrendingBooksPage />
                </Layout>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <Layout>
                  <BooksPage />
                </Layout>
              }
            />

            <Route
              path="/books/:bookId"
              element={
                <Layout>
                  <BookDetailsPage />
                </Layout>
              }
            />
            <Route
              path="/your-orders"
              element={
                <ProtectedRoute>
                  <Layout>
                    <YourOrders />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-now"
              element={
                <ProtectedRoute>
                  <Layout>
                    <OrderPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Add the SearchResultsPage route */}
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchResultsPage />
                </Layout>
              }
            />
            {/* Routes with AuthenticationLayout */}
            <Route
              path="/login"
              element={
                <AuthenticationLayout>
                  <LoginPage />
                </AuthenticationLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthenticationLayout>
                  <SignupPage />
                </AuthenticationLayout>
              }
            />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
