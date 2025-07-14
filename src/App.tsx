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
          <Route path="/aksamedia/login" element={<LoginPage />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/aksamedia/" element={<DashboardPage />} />
            <Route path="/aksamedia/profile" element={<ProfilePage />} />
            <Route path="/aksamedia/edit" element={<EditPage />} />
            <Route path="/aksamedia/add" element={<AddPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
