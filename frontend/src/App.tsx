import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SignupPage from './components/pages/SignUpPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import UserPage from './components/pages/UserPage';
import AuthenticationLayout from './components/layout/AuthenticationLayout';

function App() {
  return (
    <Router>
      {/* Routes that need Layout */}
      <Routes>
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
      </Routes>

      {/* Routes that need AuthenticationLayout */}
      <Routes>
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
  );
}

export default App;
