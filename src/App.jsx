import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Members from './pages/Members';
import Setting from './pages/Setting';
import Candidate from "./pages/Candidate";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
