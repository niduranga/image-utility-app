import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Compress from './pages/Compress';
import Resize from './pages/Resize';
import Crop from './pages/Crop';
import RemoveBg from './pages/RemoveBg';
import Bulk from './pages/Bulk';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/resize" element={<Resize />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="/remove-bg" element={<RemoveBg />} />
          <Route path="/bulk" element={<Bulk />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
