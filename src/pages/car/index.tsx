import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import Container from "../../components/container";
import Car from "../../models/car";
import { database } from "../../services/firebase";

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(database, "cars", id);
      await getDoc(docRef).then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: Number(snapshot.data()?.year),
          city: snapshot.data()?.city,
          userID: snapshot.data()?.userID,
          description: snapshot.data()?.description,
          price: Number(snapshot.data()?.price),
          mileage: snapshot.data()?.mileage,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images,
        });
      });
    }

    loadCar();
  }, [id]);
  return (
    <Container>
      <h1>Detalhes do Carro</h1>
    </Container>
  );
}

export default CarDetail;
