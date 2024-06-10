import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { deleteObject, ref } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import Container from "../../components/container";
import DashboardHead from "../../components/head";
import { database, storage } from "../../services/firebase";
import Car from "../../models/car";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCars() {
      const carsRef = collection(database, "cars");
      const queryRef = query(
        carsRef,
        where("userID", "==", user?.uid)
      );

      await getDocs(queryRef).then((snapshot) => {
        const listCars = Array<Car>();
        snapshot.forEach((document) => {
          listCars.push({
            id: document.id,
            userID: document.data().userId,
            name: document.data().name,
            year: Number(document.data().year),
            city: document.data().city,
            mileage: document.data().mileage,
            price: Number(document.data().price),
            images: document.data().images,
          });
        });

        if (!user?.uid) {
          return;
        }

        setCars(listCars);
      }, user);
    }

    loadCars();
  }, [user]);

  function handleImageLoad(car: Car) {
    setLoadImages((prevLoadImages) => [...prevLoadImages, car.id]);
  }

  async function handleDeleteCar(car: Car) {
    const docRef = doc(database, "cars", car.id);
    await deleteDoc(docRef);

    car.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
    });

    setCars(cars.filter((pivot) => pivot.id !== car.id));
  }

  return (
    <Container>
      <DashboardHead />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg">
              <button
                onClick={() => handleDeleteCar(car)}
                className="absolute right-2 top-2 drop-shadow bg-white w-14 h-14 rounded-full flex items-center justify-center"
              >
                <FiTrash2 size={26} color="#000" />
              </button>
              <div
                className="w-full h-72 rounded-lg bg-slate-200"
                style={{
                  display: loadImages.includes(car.id) ? "none" : "block",
                }}
              ></div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src={car.images[0].url}
                alt={car.name}
                onLoad={() => handleImageLoad(car)}
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">
                  Ano {car.year} | {car.mileage} Km
                </span>
                <strong className="text-black text-xl">
                  {car.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>
              <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}

export default Dashboard;
