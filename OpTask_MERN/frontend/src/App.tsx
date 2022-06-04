import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
