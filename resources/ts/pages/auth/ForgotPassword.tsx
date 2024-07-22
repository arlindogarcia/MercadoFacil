import { DefaultButton } from "@/components/DefaultButton";
import { Logo } from "@/components/Logo";
import { TextInput } from "@/components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React, { FormEvent, useState } from "react";

interface Props {
  status?: string;
}

function ForgotPassword({ status }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const [success, setSucess] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post("/forgot-password", { onSuccess: () => setSucess('Você receberá em instantes um email com instruções para redefinição.')});
  };

  return (
    <div className="bg-gray-50 min-h-[100vh] flex flex-col justify-center align-center">
      <div className="w-full md:w-[25vw] mx-auto">
        <Logo />
        <div className="bg-white rounded p-10 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold	text-gray-800">Recuperar senha</h3>
          </div>
          <div className="relative">
            <h2 className="text-md font-normal text-gray-700 mt-2 mb-8">Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha:</h2>
            {success && <div className="my-4 text-sm font-medium text-green-600 bg-green-200 p-2 rounded">{success}</div>}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextInput type="email" label="Email" value={data.email} onChange={(e) => setData("email", e.target.value)} error={errors.email} />
              </div>
              <DefaultButton type="submit" processing={processing}>
              Recuperar senha
              </DefaultButton>
            </form>
            <p className="mt-6 text-center text-gray-500 text-sm">
              <Link href="/login" className="text-green-500 hover:text-green-700 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
