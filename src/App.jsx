import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleAdsAuditDashboard from "./components/GoogleAdsAuditDashboard";
import PdfPage from "./components/GoogleAdsAuditDashboard/PdfPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAdsAuditDashboard />} />
        <Route path="/pdf" element={<PdfPage />} />
      </Routes>
    </Router>
  );
}

export default App;



