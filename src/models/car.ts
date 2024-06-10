import ImageCar from "./imagecar";

interface Car {
  id: string;
  userID: string;
  name: string;
  year: number;
  price: number;
  city: string;
  mileage: number;
  model?: string;
  description?: string;
  owner?: string;
  whatsapp?: string;
  images: ImageCar[];
}

export default Car;
