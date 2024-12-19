import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        {/* Add your main content or routes here */}
        <div>
          <h1>Welcome to Page Keeper</h1>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
