import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "É obrigatório informar o nome"),
  email: z.string().min(1, "É obrigatório informar o e-mail").email("Insira o e-mail válido"),
  password: z.string().min(1, "É obrigatório informar a senha. ").min(6, "A senha deve ter no mínimo 6 caracteres."),
});

type FormDataRegister = z.infer<typeof schema>;

export { schema };
export default FormDataRegister;
