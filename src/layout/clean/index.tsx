import { Link, Outlet } from "react-router-dom";

import Container from "../../components/container";

import logoImg from "../../assets/logo.svg";

function CleanLayout() {
  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link className="mb-6 max-w-sm w-full" to="/">
          <img className="w-full" src={logoImg} alt="Web Carros Logo"/>
        </Link>
        <Outlet />
      </div>
    </Container>
  );
}

export default CleanLayout;
