import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignupPage from "./components/pages/SignUpPage";
import HomePage from "./components/pages/HomePage";
import UserPage from "./components/pages/UserPage";
import AuthenticationLayout from "./components/layout/AuthenticationLayout";
import { LoginPage } from "./components/pages/LoginPage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
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
          <Route
            path="/user"
            element={
              <Layout>
                <UserPage />
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
      </Router>
    </UserProvider>
  );
}

export default App;
