import { Routes, Route, BrowserRouter } from "react-router"
import Home from './pages/Home.jsx'
import { UserProvider } from "./context/UserContext.jsx";
import HackathonsList from "./pages/HackathonsList.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import HackathonDetail from "./pages/HackathonDetail.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import Spinner from "./components/Spinner.jsx";
import LoginValidator from "./components/LoginValidator.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans pb-12">
      <LoadingProvider> {/* Loading provider to show the spinner */}
        <UserProvider>
          <LoginValidator/> {/* Allow to connect if the token in the localStorage is valid on initialization */}
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/hackathons" element={<HackathonsList />} />
              <Route path="/hackathons/:id" element={<HackathonDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
          <Spinner /> {/* Spinner to be showed if needed */}
        </UserProvider>
      </LoadingProvider>
    </div>
  );
}

