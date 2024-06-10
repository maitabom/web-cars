import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { FaWhatsapp } from "react-icons/fa";
//import Swiper from "swiper/react";

import Container from "../../components/container";
import Car from "../../models/car";
import { database } from "../../services/firebase";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car>();

  const navigate = useNavigate();
  //const [sliderPerView, setSlidePerView] = useState<number>(2)

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(database, "cars", id);
      await getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) navigate("/");

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: Number(snapshot.data()?.year),
          city: snapshot.data()?.city,
          userID: snapshot.data()?.userID,
          model: snapshot.data()?.model,
          description: snapshot.data()?.description,
          price: Number(snapshot.data()?.price),
          mileage: snapshot.data()?.mileage,
          owner: snapshot.data()?.owner,
          whatsapp: snapshot.data()?.whatsapp,
          images: snapshot.data()?.images,
        });
      });
    }

    loadCar();
  }, [id, navigate]);
  return (
    <Container>
      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car.name}</h1>
            <p className="font-bold text-3xl text-indigo-950">
              {car.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <p>{car.model}</p>
          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade:</p>
                <strong>{car.city}</strong>
              </div>
              <div>
                <p>Ano:</p>
                <strong>{car.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>Quilometragem:</p>
                <strong>{car.mileage} Km</strong>
              </div>
            </div>
          </div>
          <p className="font-bold">Descrição</p>
          <p className="mb-4">{car.description}</p>
          <p className="font-bold">Telefone (WhatsApp)</p>
          <p>{car.whatsapp}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=+55${car.whatsapp}&text=Olá vi esse ${car?.name} no site WebCarros e fique interessado!`} target="_blank"
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-12 text-xl rounded-lg font-medium cursor-pointer"
          >
            Conversar com o vendedor <FaWhatsapp size={25} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
}

export default CarDetail;
