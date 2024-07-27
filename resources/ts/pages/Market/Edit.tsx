import Layout from "@/layouts/Layout";
import { DefaultButton } from "@/components/DefaultButton";
import { Title } from "@/layouts/Layout/title";
import React, { useEffect, useState } from "react";
import { PurchaseList } from "./types/purchase_list";
import axios, { AxiosResponse } from "axios";
import { Link, useForm, usePage } from "@inertiajs/react";
import { newPurchaseList } from "./data/purchase_list";
import { TextInput } from "@/components/TextInput";
import { InputCurrency } from "@/components/InputCurrency";
import { FiArrowLeft, FiPlus, FiSave, FiTrash } from "react-icons/fi";
import { CheckInput } from "@/components/CheckInput";
import "./EditStyles.css";
import helper from "@/utils/helper";
import { newPurchaseListItem } from "./data/purchase_list_item";
import { route } from "ziggy-js";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { SecondaryButton } from "@/components/SecondaryButton";
import { DangerButton } from "@/components/DangerButton";
import { InputDiv } from "./components/InputDiv";

export default () => {
  const props = usePage().props;

  const id = props.id as string;

  const [isLoadingForm, setIsLoadingForm] = useState(id != "new");
  const {
    data: form,
    setData: setForm,
    processing,
    errors,
    post,
  } = useForm<PurchaseList>(newPurchaseList());

  const getPurchaseList = async () => {
    setIsLoadingForm(true);
    const resp: AxiosResponse<PurchaseList> = await axios.get(`/api/purchase-lists/${id}`);

    setForm(resp.data);
    setIsLoadingForm(false);
  };

  const handleSubmit = async () => {
    return post(route("api.purchase.store"), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  useEffect(() => {
    if (id != "new") {
      getPurchaseList();
      return;
    }
    setIsLoadingForm(false);
  }, [id]);

  const getSumOfMarkedItems = () => {
    return form.items.reduce((acumullator, currentValue) => {
      if (currentValue.checked == 0) {
        return acumullator;
      }

      return acumullator + (currentValue.quantity ?? 0) * (currentValue.unitary_value ?? 0);
    }, 0);
  };

  const getBalance = () => {
    return form.budget - getSumOfMarkedItems();
  };

  const [confirmationDeleteList, setConfirmationDeleteList] = useState(false);

  const deleteItemForm = useForm({});
  const [deleting, setDeleting] = useState(false);
  const deleteItem = () => {
    setDeleting(true);
    deleteItemForm.delete(route("api.purchase.destroy", { id: id }), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  if (isLoadingForm) {
    return (
      <Layout
        header={
          <React.Fragment>
            <Title>Lista de Compra</Title>

            <div className="flex gap-1">
              <DefaultButton
                externalClass="w-auto flex gap-1 justify-center items-center"
                color="red"
              >
                <FiTrash /> Excluir
              </DefaultButton>

              <Link href="/purchase-lists">
                <DefaultButton
                  externalClass="w-auto flex gap-1 justify-center items-center"
                  color="gray"
                >
                  <FiArrowLeft /> Voltar
                </DefaultButton>
              </Link>
            </div>
          </React.Fragment>
        }
      >
        <div className="w-full text-center font-semibold text-gray-600 text-lg">Carregando...</div>
      </Layout>
    );
  }

  const onUpdateItem = (field: string, value: any, index: number) => {
    const items = JSON.parse(JSON.stringify(form.items));

    items[index][field] = value;

    setForm({
      ...form,
      items: items,
    });
  };

  const handleKeyPress = (event: any, onlyNumbers = true) => {
    if (
      onlyNumbers &&
      isNaN((String as any).fromCharCode(event.which)) &&
      event.key != "Backspace"
    ) {
      event.preventDefault();
    }
  };

  const setCursorPositionToEnd = (el: HTMLElement) => {
    const range = document.createRange();
    const sel: any = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  };

  const handleNumberChange = (e: any, field: string, index: number) => {
    const value = "0".repeat(2 + 1) + e.target.innerText.replace(/[^0-9]/g, "");
    const val = value.substring(0, value.length - 2) + "." + value.substring(value.length - 2);

    onUpdateItem(field, parseFloat(val), index);
    setCursorPositionToEnd(e.target);
  };

  return (
    <Layout
      header={
        <React.Fragment>
          <Title>Lista de Compra</Title>

          <div className="flex gap-1">
            {id != "new" && (
              <DefaultButton
                externalClass="w-auto flex gap-1 justify-center items-center"
                color="red"
                onClick={() => setConfirmationDeleteList(true)}
              >
                <FiTrash /> Excluir
              </DefaultButton>
            )}

            <Link href="/purchase-lists">
              <DefaultButton
                externalClass="w-auto flex gap-1 justify-center items-center"
                color="gray"
              >
                <FiArrowLeft /> Voltar
              </DefaultButton>
            </Link>
          </div>
        </React.Fragment>
      }
    >
      <div className="w-full sm:max-w-[500px] mx-auto flex flex-wrap pb-60">
        <TextInput
          label="Mercado"
          value={form.marketplace}
          onChange={(event) => setForm({ ...form, marketplace: event.target.value })}
          externalClass="w-full"
          error={errors.marketplace}
        />
        <InputCurrency
          label="Orçamento"
          value={form.budget}
          onChangeVal={(value) => setForm({ ...form, budget: value })}
          externalClass="w-full"
        />

        <table className="w-full mt-4 table list-table">
          <thead>
            <tr className="text-gray-600 bg-gray-300 text-sm">
              <th></th>
              <th>QTD.</th>
              <th>PRODUTO</th>
              <th>PREÇO</th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, index) => (
              <tr
                key={`${index}`}
                className={`py-0 border ${index % 2 == 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="p-1 w-[5%] border">
                  <CheckInput
                    label=""
                    checked={form.items[index].checked == 1}
                    onChangeVal={(value) => onUpdateItem("checked", value, index)}
                  />
                </td>
                <td className="max-w-[5%] border">
                  <InputDiv
                    onlyNumbers={true}
                    value={form.items[index].quantity}
                    onInput={(event) =>
                      onUpdateItem(
                        "quantity",
                        isNaN(parseInt((event.target as any).innerText))
                          ? ""
                          : parseInt((event.target as any).innerText),
                        index
                      )
                    }
                    inputMode="decimal"
                    externalClassName="text-center"
                  />
                </td>
                <td className="w-[62%] border">
                  <InputDiv
                    value={form.items[index].product}
                    onInput={(event) =>
                      onUpdateItem("product", (event.target as any).innerText, index)
                    }
                  />
                </td>
                <td className="w-[18%] border text-left">
                  <InputDiv
                    value={helper.formatNumber(form.items[index].unitary_value, 2)}
                    onInput={(event) => handleNumberChange(event, "unitary_value", index)}
                    inputMode="decimal"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DefaultButton
          onClick={() => {
            setForm({
              ...form,
              items: [...form.items, { ...newPurchaseListItem() }],
            });
          }}
          size="sm"
          externalClass="w-auto flex items-center justify-center gap-1 mx-auto mt-2"
          color="blue"
        >
          <FiPlus /> Incluir
        </DefaultButton>
      </div>
      <ConfirmationModal
        show={confirmationDeleteList}
        close={() => setConfirmationDeleteList(false)}
        title={"Remover lista de compra"}
        content={"Você tem certeza que deseja remover esta lista de compra?"}
        footer={
          <>
            <SecondaryButton
              externalClass="w-auto"
              onClick={() => setConfirmationDeleteList(false)}
            >
              Cancelar
            </SecondaryButton>

            <DangerButton processing={deleting} externalClass="ms-3" onClick={deleteItem}>
              Remover
            </DangerButton>
          </>
        }
      />
      <div className="w-full flex bg-white shadow-[15px_10px_10px_5px] w-full p-2 justify-center fixed bottom-0 left-0">
        <div className="sm:ml-[17.5rem] min-w-[100vw] sm:min-w-[500px] px-3">
          <div className="w-full">
            <div className="w-full flex flex-wrap border-b mb-3 pb-1">
              <div className="w-1/3 text-center">
                <span className="font-bold text-gray-700">ORÇAMENTO</span>
                <br />
                <span className="font-semibold text-gray-500">
                  {helper.formatMoney(form.budget)}
                </span>
              </div>
              <div className="w-1/3 text-center">
                <span className="font-bold text-gray-700">MARCADO</span>
                <br />
                <span className="font-semibold text-gray-500">
                  {helper.formatMoney(getSumOfMarkedItems())}
                </span>
              </div>
              <div className="w-1/3 text-center">
                <span className="font-bold text-gray-700">SALDO</span>
                <br />
                <span className="font-semibold text-gray-500">
                  {helper.formatMoney(getBalance())}
                </span>
              </div>
            </div>
            <DefaultButton
              processing={processing}
              onClick={handleSubmit}
              externalClass="w-full flex gap-1 justify-center items-center"
            >
              <FiSave /> Salvar
            </DefaultButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};
