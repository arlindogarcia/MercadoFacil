import { DefaultButton } from "@/components/DefaultButton";
import { Logo } from "@/components/Logo";
import { TextInput } from "@/components/TextInput";
import { useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";

interface Props {
  status?: string;
  token?: string;
}

function ResetPassword({ status, token }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    password_confirmation: "",
    token: token,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post("/reset-password");
  };

  return (
    <div className="bg-gray-50 min-h-[100vh] flex flex-col justify-center align-center">
      <div className="w-full md:w-[25vw] mx-auto">
        <Logo />
        <div className="bg-white rounded p-10 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-semibold	text-gray-800">Resetar senha</h3>
          </div>
          <div className="relative">
            <h2 className="text-md font-normal text-gray-700 mt-2 mb-8">Digite sua nova senha. </h2>

            {status && (
              <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                {status}
              </div>
            )}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextInput
                  id="email"
                  type="email"
                  label="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  error={errors.email}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="password"
                  type="password"
                  label="Senha"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  error={errors.password}
                />
              </div>

              <div className="mb-4">
                <TextInput
                  id="password_confirmation"
                  type="password"
                  label="Confirme a senha"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  error={errors.password_confirmation}
                />
              </div>

              <DefaultButton type="submit" processing={processing}>
                Resetar senha
              </DefaultButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
