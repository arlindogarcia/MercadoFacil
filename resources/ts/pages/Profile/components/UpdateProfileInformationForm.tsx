import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { usePage, router } from "@inertiajs/react";
import { TextInput } from "@/components/TextInput";
import { DefaultButton } from "@/components/DefaultButton";

function UpdateProfileInformationForm() {
  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");

  const auth = usePage().props as any;
  const errors = usePage().props.errors;

  const [processing, setProcessing] = useState(false);
  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setProcessing(true);
    router.post("user/profile-information", {
      _method: "put",
      name: nameForm,
      email: emailForm,
    }, { onFinish: () => { setProcessing(false); } });
  }

  useEffect(() => {
    setNameForm(auth.user.name);
    setEmailForm(auth.user.email);
  }, []);

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium text-gray-900"> Informações do Perfil </h3>
          <p className="mt-1 text-sm text-gray-600">
            {" "}
            Atualize as informações de perfil e endereço de e-mail da sua conta.{" "}
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form>
            <div className="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-tl-md sm:rounded-tr-md">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <TextInput label="Nome" onChange={(e) => setNameForm(e.target.value)} value={nameForm} error={errors.updateProfileInformation?.name} />
                </div>

                <div className="col-span-6 mb-3">
                  <TextInput label="Email" onChange={(e) => setEmailForm(e.target.value)} value={emailForm} error={errors.updateProfileInformation?.email} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start px-4 py-3 text-right border-t shadow bg-gray-50 sm:px-6 sm:rounded-bl-md sm:rounded-br-md">
              <DefaultButton externalClass='w-auto' type="submit" onClick={handleSubmit} processing={processing}>
                Salvar
              </DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfileInformationForm;
