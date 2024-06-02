import { ChangeEvent, useContext, useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import DashboardHead from "../../../components/head";
import Container from "../../../components/container";
import FormDataCar, { schema } from "./validation";
import InputField from "../../../components/input";
import { AuthContext } from "../../../context/AuthContext";
import { database, storage } from "../../../services/firebase";
import ImageCar from "../../../models/imagecar";

function NewCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataCar>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { user } = useContext(AuthContext);

  const [carImages, setCarImages] = useState<ImageCar[]>([]);

  async function submitForm(data: FormDataCar) {
    if (carImages.length === 0) {
      toast.error("Por favor, envie uma imagem deste carro");
      return;
    }

    addDoc(collection(database, "cars"), {
      name: data.name,
      model: data.model,
      whatsapp: data.whatsapp,
      city: data.city,
      year: data.year,
      mileage: data.mileage,
      price: data.price,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      userId: user?.uid,
      images: carImages,
    })
      .then(() => {
        toast.success("Veículo cadastrado com sucesso");
        setCarImages([]);
        reset();
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao salvar o veículo");
        console.log(error);
      });
  }

  async function submitFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        toast.error("Favor, enviar a imagem em JPEG ou PNG");
      }
    }
  }

  async function handleUpload(image: File) {
    if (user?.uid) {
      const userId = user.uid;
      const imageId = uuid();

      const uploadRef = ref(storage, `cars/${userId}/${imageId}`);

      await uploadBytes(uploadRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem: ImageCar = {
            name: imageId,
            uid: userId,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          };

          setCarImages((images) => [...images, imageItem]);
        });
      });
    }
  }

  async function deleteImage(image: ImageCar) {
    const imagePath = `cars/${image.uid}/${image.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((car) => car.url !== image.url));
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir");
      console.log(error);
    }
  }

  return (
    <Container>
      <DashboardHead />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row gap-2">
        <button className="border-2 border-gray-600 w-48 rounded-lg flex items-center justify-center cursor-pointer h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={submitFile}
            />
          </div>
        </button>
        {carImages.map((image) => (
          <div
            key={image.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button className="absolute" onClick={() => deleteImage(image)}>
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={image.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="Foto do carro"
            />
          </div>
        ))}
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(submitForm)}>
          <div className="mb-3">
            <label htmlFor="name">Nome do carro</label>
            <InputField
              type="text"
              register={register}
              name="name"
              placeholder="Ex: Fiat Marea 1.0..."
              error={errors.name?.message}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Modelo do carro</label>
            <InputField
              type="text"
              register={register}
              name="model"
              placeholder="Ex: Weekend"
              error={errors.model?.message}
            />
          </div>
          <div className="w-full flex mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="name">Ano</label>
              <InputField
                type="text"
                register={register}
                name="year"
                placeholder="Ex: 2007"
                error={errors.year?.message}
              />
            </div>
            <div className="w-full">
              <label htmlFor="name">Quilometragem</label>
              <InputField
                type="text"
                register={register}
                name="mileage"
                placeholder="Ex: 28999 Km"
                error={errors.mileage?.message}
              />
            </div>
          </div>
          <div className="w-full flex mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="name">WhatsApp de Contato</label>
              <InputField
                type="text"
                register={register}
                name="whatsapp"
                placeholder="Ex: 11999999999"
                error={errors.whatsapp?.message}
              />
            </div>
            <div className="w-full">
              <label htmlFor="name">Cidade</label>
              <InputField
                type="text"
                register={register}
                name="city"
                placeholder="Ex: São Paulo - SP"
                error={errors.city?.message}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Preço do carro</label>
            <InputField
              type="text"
              register={register}
              name="price"
              placeholder="Ex: R$ 10.000,00"
              error={errors.price?.message}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Descrição do carro</label>
            <textarea
              className="w-full border-2 rounded-md h-24 px-2"
              placeholder="Digite a descrição sobre o veículo"
              name="description"
              {...register("description")}
            />
            {errors.description && (
              <p className="my-1 text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Salvar
          </button>
        </form>
      </div>
    </Container>
  );
}

export default NewCar;
