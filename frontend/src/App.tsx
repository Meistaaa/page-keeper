import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignUpPage';
import UserPage from './components/pages/UserPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<h1>Welcome to Page Keeper</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
