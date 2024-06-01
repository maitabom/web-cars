import { FiUpload } from "react-icons/fi";
import DashboardHead from "../../../components/head";
import Container from "../../../components/container";

function NewCar() {
  return (
    <Container>
      <DashboardHead/>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row gap-2">
        <button className="border-2 border-gray-600 w-48 rounded-lg flex items-center justify-center cursor-pointer h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000"/>
          </div>
          <div className="cursor-pointer">
            <input className="opacity-0 cursor-pointer" type="file" accept="image/*"/>
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <h1>Teste</h1>
      </div>
    </Container>
  );
}

export default NewCar;
