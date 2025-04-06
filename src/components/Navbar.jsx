import { useNavigate } from 'react-router';
import { useUserContext } from "../context/UserContext";
import logo from '../assets/Logo.png';

export default function Navbar() { //Show different buttons to navigate between different pages and allow to the user to disconnect
  const userContext = useUserContext();
  const navigate = useNavigate();

  const onDisconnect = (e) => {
    e.preventDefault();
    userContext.setUser({ email: '', isAuthentified: false });
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <header className="w-full bg-[#2a2a2a] px-6 py-4 shadow-md">
      <nav className="flex flex-wrap justify-center items-center gap-4">
        
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="HackTrack Logo" className="h-10 w-auto" />
        </div>
  
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={(e) => { e.preventDefault(); navigate("/"); }} className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">Accueil</button>
          <button onClick={(e) => { e.preventDefault(); navigate("/Hackathons"); }} className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">Liste des hackathons</button>
  
          {!userContext.user.isAuthentified && (
            <>
              <button onClick={(e) => { e.preventDefault(); navigate("/Register"); }} className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">S'inscrire</button>
              <button onClick={(e) => { e.preventDefault(); navigate("/Login"); }} className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">Connexion</button>
            </>
          )}
  
          {userContext.user.isAuthentified && (
            <button onClick={onDisconnect} className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
              Se déconnecter ({userContext.user.name})
            </button>
          )}
        </div>
      </nav>
    </header>
  );
  
}
