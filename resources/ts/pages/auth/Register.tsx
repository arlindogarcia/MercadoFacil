import React, { ChangeEvent, FormEvent, useState } from "react";
import { router } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import { TextInput } from "@/components/TextInput";
import { DefaultButton } from "@/components/DefaultButton";
import { Logo } from "@/components/Logo";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const errors = usePage().props.errors;

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
    router.post("/register", {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
    }, { onFinish: () => setProcessing(false) });
  }

  return (
    <div className="bg-gray-50 min-h-[100vh] flex flex-col justify-center align-center">
      <div className="w-full md:w-[25vw] mx-auto">
        <Logo />
        <div className="bg-white rounded p-10 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold	text-gray-800">Criar conta</h3>
          </div>
          <div className="relative">
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextInput id="name" label="Seu nome" value={form.name} onChange={handleChange} error={errors.name} />
              </div>
              <div className="mb-4">
                <TextInput id="email" type="email" label="Email" value={form.email} onChange={handleChange} error={errors.email} />
              </div>
              <div className="mb-4">
                <TextInput id="password" type="password" label="Senha" value={form.password} onChange={handleChange} error={errors.password} />
              </div>
              <div className="mb-4">
                <TextInput id="confirmPassword" type="password" label="Confirme a senha" value={form.confirmPassword} onChange={handleChange} error={errors.password_confirmation} />
              </div>
              <DefaultButton type="submit" processing={processing}>
                Criar conta
              </DefaultButton>
            </form>
            <p className="mt-6 text-center text-gray-500 text-sm">
              Já tem um cadastro?
              {" "}
              <Link href="/login" className="text-green-500 hover:text-green-700 font-bold">
                Entre com sua conta.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
