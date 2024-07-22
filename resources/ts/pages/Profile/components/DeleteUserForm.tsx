import React, { useState, MouseEvent } from "react";
import { router } from "@inertiajs/react";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { SecondaryButton } from "@/components/SecondaryButton";
import { DangerButton } from "@/components/DangerButton";

function DeleteUserForm() {
  const [modal, setModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  function confirmUserDelete() {
    setModal(true);
  }

  function deleteUser(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setProcessing(true);
    router.post(
      "/profileDelete",
      {
        _method: "delete",
        preserveScroll: true,
      },
      {
        onFinish: () => setProcessing(false),
      }
    );
  }
  return (
    <div>
      <div className="mt-10 md:grid md:grid-cols-3 md:gap-6 sm:mt-0">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium text-gray-900"> Deletar conta </h3>
            <p className="mt-1 text-sm text-gray-600"> Exclua permanentemente sua conta. Todos os dados serão perdidos, é irreversível. </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-white shadow sm:p-6 sm:rounded-lg">
            <div className="max-w-xl text-sm text-gray-600">
              Depois que sua conta for excluída, todos os seus recursos e dados serão
              permanentemente excluído. Antes de excluir sua conta, baixe todos os dados ou
              informações que você deseja reter.
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={confirmUserDelete}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-red-600 border border-transparent rounded-md hover:bg-red-500"
              >
                Deletar Conta
              </button>
            </div>

            <ConfirmationModal
              show={modal}
              close={() => setModal(false)}
              title={"Excluir conta"}
              content={
                "Tem certeza de que deseja excluir sua conta? Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente"
              }
              footer={
                <>
                  <SecondaryButton externalClass="w-auto" onClick={() => setModal(false)}>
                    Cancelar
                  </SecondaryButton>

                  <DangerButton processing={processing} externalClass="ms-3" onClick={deleteUser}>
                    Deletar Conta
                  </DangerButton>
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserForm;
