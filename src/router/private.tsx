import { useContext } from "react";
import { Navigate } from "react-router-dom";

import PrivateProps from "./private.props";
import { AuthContext } from "../context/AuthContext";

function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default Private;
