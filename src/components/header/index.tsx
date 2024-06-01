import { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUser } from "react-icons/fi";

import { AuthContext } from "../../context/AuthContext";

import logoImg from "../../assets/logo.svg";

function Header() {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <div className="w-full flex items-center h-16 bg-white drop-shadow mb-4 justify-center">
      <header className="w-full flex items-center justify-between max-w-7xl px-4 mx-auto">
        <Link className="" to="/">
          <img src={logoImg} alt="Web Carrros Logo" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <div className="border-2 rounded-full p-2 text-black border-gray-900 hover:bg-black hover:text-white">
              <FiUser size={24} />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <div className="border-2 rounded-full p-2 text-black border-gray-900 hover:bg-black hover:text-white">
              <FiLogIn size={24} />
            </div>
          </Link>
        )}
      </header>
    </div>
  );
}

export default Header;
