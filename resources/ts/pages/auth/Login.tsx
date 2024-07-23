import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { TextInput } from "@/components/TextInput";
import { CheckInput } from "@/components/CheckInput";
import { DefaultButton } from "@/components/DefaultButton";
import { Logo } from "@/components/Logo";

interface Props {
  status?: string;
}

function Login({ status }: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.id;
    const value = e.target.value;
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  }

  const [processing, setProcessing] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);
    router.post("/login", {
      email: form.email,
      password: form.password,
    }, { onFinish: () => setProcessing(false) })
  }

  const errors = usePage().props.errors;
  return (
    <div className="bg-gray-50 min-h-[100vh] flex flex-col justify-center align-center">
      <div className="w-full md:w-[25vw] mx-auto">
        <Logo />
        <div className="bg-white rounded p-10 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold	text-gray-800">Entrar</h3>
          </div>
          <div className="relative">
            <h2 className="text-md font-normal text-gray-700 mt-2 mb-8">Insira suas credenciais abaixo:</h2>
            {status && <div className="my-4 text-sm font-medium text-green-600">{status}</div>}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextInput id="email" type="email" label="Email" value={form.email} onChange={handleChange} error={errors.email} />
              </div>
              <div className="mb-4">
                <TextInput id="password" type="password" label="Senha" value={form.password} onChange={handleChange} error={errors.password} />
              </div>
              <DefaultButton processing={processing}>Entrar</DefaultButton>
            </form>
            <p className="mt-6 text-center text-gray-500 text-sm">
              Não tem cadastro?
              {" "}
              <Link href="/register" className="text-green-500 hover:text-green-700 font-bold">
                Crie uma conta.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
