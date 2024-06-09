import ImageCar from "./imagecar";

interface Car {
  id: string;
  userID: string;
  name: string;
  year: number;
  price: number;
  city: string;
  mileage: number;
  description?: string;
  owner?: string
  images: ImageCar[];
}

export default Car;
