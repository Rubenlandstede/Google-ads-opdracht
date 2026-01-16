import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import GoogleAdsAuditDashboard from "./components/GoogleAdsAuditDashboard";
import PdfPage from "./components/GoogleAdsAuditDashboard/PdfPage";
import CustomersPage from "./components/GoogleAdsAuditDashboard/CustomersPage";




import { addCustomer, createYearWithMonths } from "./firestoreFunctions";

function App() {

  
  useEffect(() => {
    createYearWithMonths(2026);
  }, []);

   addCustomer(2026, "january", {
      name: "Test Klant",
      email: "test@klant.nl"
    }); 

    

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAdsAuditDashboard />} />
        <Route path="/pdf" element={<PdfPage />} />
         <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </Router>
  );
}

export default App;





