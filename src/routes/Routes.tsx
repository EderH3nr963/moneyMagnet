import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useAuth, useTheme } from "../context";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AddCategory from "../pages/AddCategory";
import Categories from "../pages/Categories";
import EditCategory from "../pages/EditCategory";
import TransactionsPage from "../pages/Transactions";
import EditTransaction from "../pages/EditTransaction";
import Settings from "../pages/Settings";
import ImportCSV from "../pages/ImportCSV";
import EditPerfil from "../pages/EditPerfil";
import UpdatePassword from "../pages/UpdatePassword";
import HomePage from "../pages/Home";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function ApplyTheme({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      data-theme={theme === "light" ? "light" : "dark"}
      className="dark:bg-gray-900"
    >
      {children}
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/transaction/edit/:id"
        element={
          <PrivateRoute>
            <EditTransaction />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/edit/:id"
        element={
          <PrivateRoute>
            <EditCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <TransactionsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />
      <Route
        path="/category/add"
        element={
          <PrivateRoute>
            <AddCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/import-csv"
        element={
          <PrivateRoute>
            <ImportCSV />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditPerfil />
          </PrivateRoute>
        }
      />

      <Route
        path="/update-password"
        element={
          <PrivateRoute>
            <UpdatePassword />
          </PrivateRoute>
        }
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export { ApplyTheme };
