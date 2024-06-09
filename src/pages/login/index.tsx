import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

import InputField from "../../components/input";
import FormDataLogin, { schema } from "./validation";
import { auth } from "../../services/firebase";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth);
  }, []);

  async function submitForm(data: FormDataLogin) {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/dashboard", { replace: true });
      })
      .catch((error: FirebaseError) => {
        if (error.code === "auth/invalid-credential") {
          toast.error("Os dados informados são inválidos.");
        } else {
          toast.error("Ocorreu um erro ao acessar o sistema.");
          console.error(error);
        }
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} className="bg-white max-w-xl w-full rounded-lg p-4">
        <InputField type="email" placeholder="Digite o seu e-mail" name="email" error={errors.email?.message} register={register} />
        <InputField type="password" placeholder="Digite a sua senha" name="password" error={errors.password?.message} register={register} />
        <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
          Acessar
        </button>
      </form>
      <Link to="/register">Ainda não possui uma conta? Cadastre-se</Link>
    </>
  );
}

export default Login;
