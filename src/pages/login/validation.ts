import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, "É obrigatório informar o e-mail").email("Insira o e-mail válido"),
  password: z.string().min(1, "É obrigatório informar a senha"),
});

type FormDataLogin = z.infer<typeof schema>;

export { schema };
export default FormDataLogin;
