import React, { useState, useRef, MouseEvent } from "react";
import { usePage, router } from "@inertiajs/react";
import { TextInput } from "@/components/TextInput";
import { DefaultButton } from "@/components/DefaultButton";

function UpdatePasswordForm() {
  const [currentPasswordForm, setCurrentPasswordForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [passwordConfirmationForm, setPasswordConfirmationForm] = useState("");
  const [processing, setProcessing] = useState(false);

  const errors = usePage().props.errors;

  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setProcessing(true);
    router.put(
      "user/password",
      {
        _method: "put",
        current_password: currentPasswordForm,
        password: passwordForm,
        password_confirmation: passwordConfirmationForm,
        preserveScroll: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setCurrentPasswordForm("");
          setPasswordForm("");
          setPasswordConfirmationForm("");
        },
        onError: (errors: any) => {
          if (errors.updatePassword.current_password) {
            setCurrentPasswordForm("");
          }

          if (errors.updatePassword.password) {
            setPasswordForm("");
            setPasswordConfirmationForm("");
          }
        },
        onFinish: () => {
          setProcessing(false);
        }
      }
    );
  }

  return (
    <div>
      <div className="mt-10 md:grid md:grid-cols-3 md:gap-6 sm:mt-0">
        {/* left side */}
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium text-gray-900"> Atualizar senha </h3>
            <p className="mt-1 text-sm text-gray-600">
              Certifique-se de que sua conta esteja usando uma senha longa e aleatória para permanecer segura.
            </p>
          </div>
        </div>

        {/* right side */}
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <div className="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-tl-md sm:rounded-tr-md">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <TextInput autoComplete="current-password" type="password" label="Senha atual" value={currentPasswordForm} onChange={(e) => setCurrentPasswordForm(e.target.value)} error={errors.updatePassword?.current_password} />
                </div>

                <div className="col-span-6">
                  <TextInput autoComplete="new-password" type="password" label="Nova Senha" value={passwordForm} onChange={(e) => setPasswordForm(e.target.value)} error={errors.updatePassword?.password} />
                </div>

                <div className="col-span-6">
                  <TextInput autoComplete="new-password" type="password" label="Confirme a nova senha" value={passwordConfirmationForm} onChange={(e) => setPasswordConfirmationForm(e.target.value)} error={errors.updatePassword?.password} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start px-4 py-3 text-right border-t shadow bg-gray-50 sm:px-6 sm:rounded-bl-md sm:rounded-br-md">
              <DefaultButton externalClass='w-auto' type="submit" onClick={handleSubmit} processing={processing}>
                Atualizar senha
              </DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordForm;
