import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "É obrigatório informar o nome do veículo."),
  model: z.string().min(1, "É obrigatório informar o modelo do veículo."),
  year: z.string().min(1, "É obrigatório informar o ano do veículo."),
  mileage: z
    .string()
    .min(1, "É obrigatório informar a quilometragem do veículo."),
  price: z.string().min(1, "É obrigatório informar o preço do veículo."),
  city: z.string().min(1, "É obrigatório informar a cidade."),
  whatsapp: z
    .string()
    .min(
      1,
      "É obrigatório informar o número de telefone do WhatsApp de contato."
    )
    .refine((value) => /^(\d{10,11})$/.test(value), {
      message: "Número de telefone inválido.",
    }),
  description: z
    .string()
    .min(1, "É obrigatório informar a descrição do veículo"),
});

type FormDataCar = z.infer<typeof schema>;

export { schema };
export default FormDataCar;
