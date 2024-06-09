import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

import InputField from "../../components/input";
import FormDataRegister, { schema } from "./validation";
import { auth } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import User from "../../models/user";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { handleInfoUser } = useContext(AuthContext);

  useEffect(() => {
    signOut(auth);
  }, []);

  async function submitForm(data: FormDataRegister) {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        updateProfile(user.user, {
          displayName: data.name,
        });

        const pivot: User = {
          uid: user.user.uid,
          name: data.name,
          email: data.email,
        };

        handleInfoUser(pivot);

        toast.success("Usuário registrado com sucesso");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao efetuar o cadastro");
        console.error(error);
      });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-white max-w-xl w-full rounded-lg p-4"
      >
        <InputField
          type="text"
          placeholder="Digite o seu nome completo"
          name="name"
          error={errors.name?.message}
          register={register}
        />
        <InputField
          type="email"
          placeholder="Digite o seu e-mail"
          name="email"
          error={errors.email?.message}
          register={register}
        />
        <InputField
          type="password"
          placeholder="Digite a sua senha"
          name="password"
          error={errors.password?.message}
          register={register}
        />
        <button
          type="submit"
          className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
        >
          Cadastrar
        </button>
      </form>
      <Link to="/login">Já possui uma conta? Faça o login</Link>
    </>
  );
}

export default Register;
