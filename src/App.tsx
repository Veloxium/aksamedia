import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoutes from "./middleware/ProtectRoute";
import DashboardPage from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import EditPage from "./pages/Edit";
import AddPage from "./pages/Add";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/add" element={<AddPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
