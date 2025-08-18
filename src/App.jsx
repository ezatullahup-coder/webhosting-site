import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HostingPlans from './pages/HostingPlans';
import DomainSearch from './pages/DomainSearch';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Services from './pages/dashboard/Services';
import Invoices from './pages/dashboard/Invoices';
import InvoiceDetails from './pages/dashboard/InvoiceDetails';
import Profile from './pages/dashboard/Profile';
import Support from './pages/dashboard/Support';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (check localStorage or token)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen flex flex-col pt-16">
            <CustomCursor />
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <main className="flex-grow">
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/hosting-plans" element={<HostingPlans />} />
              <Route path="/domain-search" element={<DomainSearch />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/services" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Services />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/invoices" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Invoices />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/invoices/:id" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <InvoiceDetails />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/support" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Support />
                </ProtectedRoute>
              } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
