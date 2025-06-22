import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage"; 
import AdminDashboard from "../admin/pages/AdminDashboard";
import ClientDashboard from "../client/pages/ClientDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cliente" element={<ClientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
