import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext.js";

import LandingPage from "./pages/LandingPage/index.js";
import UserDashboard from "./pages/UserDashboard/index.js";
import AdminDashboard from "./pages/AdminDashboard/index.js";

function App() {
   return (
      <React.StrictMode>
         <LanguageProvider>
            <Router>
               <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                  <Routes>
                     <Route path="/" element={<LandingPage />} />
                     <Route path="/user" element={<UserDashboard />} />
                     <Route path="/admin" element={<AdminDashboard />} />
                  </Routes>
               </div>
            </Router>
         </LanguageProvider>
      </React.StrictMode>
   );
}

export default App;
