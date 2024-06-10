import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

import Container from "../../components/container";
import Car from "../../models/car";
import { database } from "../../services/firebase";

function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  async function loadCars() {
    const carsRef = collection(database, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

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

      setCars(listCars);
    });
  }

  function handleImageLoad(car: Car) {
    setLoadImages((prevLoadImages) => [...prevLoadImages, car.id]);
  }

  async function handleSearchCar() {
    if (input === "") {
      loadCars();
    } else {
      setCars([]);
      setLoadImages([]);

      const q = query(
        collection(database, "cars"),
        where("name", ">=", input),
        where("name", "<=", input + "\uf8ff")
      );

      const qs = await getDocs(q);
      const listCars = Array<Car>();

      qs.forEach((document) => {
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

      setCars(listCars);
    }
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3"
          type="text"
          placeholder="Digite o nome do carro..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-3xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg">
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

export default Home;
