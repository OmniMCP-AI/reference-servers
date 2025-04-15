import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Auth Provider
import { AuthProvider } from "./contexts/AuthContext";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import ProductStock from "./pages/ProductStock";
import ProductUI from "./pages/ProductUI";
import InboxPage from "./pages/InboxPage";
import OrderLists from "./pages/OrderLists";
import PricingPage from "./pages/PricingPage";
import Calendar from "./pages/Calendar";
import TodoPage from "./pages/TodoPage";
import ContactPage from "./pages/ContactPage";
import InvoicePage from "./pages/InvoicePage";
import ElementsUI from "./pages/ElementsUI";
import Table from "./pages/Table";
import TeamPage from "./pages/TeamPage";
import Settings from "./pages/Settings";

/**
 * Main App Component
 *
 * This is the root component that sets up routing and authentication
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected routes with DashboardLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product-stock" element={<ProductStock />} />
              <Route path="/products" element={<ProductUI />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/order-lists" element={<OrderLists />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/ui-elements" element={<ElementsUI />} />
              <Route path="/table" element={<Table />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Catch-all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
