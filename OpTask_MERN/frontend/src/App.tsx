import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import Proyectos from "./pages/Proyectos";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="forgot-password/:token"
              element={<NewPassword />}
            ></Route>
            <Route
              path="confirm-account/:token"
              element={<ConfirmAccount />}
            ></Route>
          </Route>
          <Route path="/proyectos" element={<ProtectedRoute />}>
            <Route index element={<Proyectos />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
