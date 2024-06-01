import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebase";

function DashboardHead() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Novo Carro</Link>
      <button className="ml-auto" type="button" onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default DashboardHead;
