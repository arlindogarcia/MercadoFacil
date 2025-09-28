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
import { FiArrowLeft, FiPlus, FiSave, FiTrash, FiCheckSquare, FiSquare, FiMenu } from "react-icons/fi";
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
      onSuccess: (data: any) => {
        if (data.props?.flash?.list) {
            setForm(data.props?.flash?.list);
        }
      }
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
      if (currentValue.checked == 0 || currentValue.deleted) {
        return acumullator;
      }

      return acumullator + (currentValue.quantity ?? 0) * (currentValue.unitary_value ?? 0);
    }, 0);
  };

  const getBalance = () => {
    return form.budget - getSumOfMarkedItems();
  };

  const [confirmationDeleteList, setConfirmationDeleteList] = useState(false);
  const [swipeStates, setSwipeStates] = useState<{[key: number]: {offset: number, showDelete: boolean, isDragging: boolean}}>({});
  const [isDraggingAny, setIsDraggingAny] = useState(false);

  // Prevenir navegação do navegador durante o arrastar
  useEffect(() => {
    const preventNavigation = (e: TouchEvent) => {
      if (isDraggingAny) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isDraggingAny) {
      document.addEventListener('touchstart', preventNavigation, { passive: false });
      document.addEventListener('touchmove', preventNavigation, { passive: false });
      document.addEventListener('touchend', preventNavigation, { passive: false });
    }

    return () => {
      document.removeEventListener('touchstart', preventNavigation);
      document.removeEventListener('touchmove', preventNavigation);
      document.removeEventListener('touchend', preventNavigation);
    };
  }, [isDraggingAny]);

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

  const toggleAllItems = () => {
    const visibleItems = form.items.filter(item => !item.deleted);
    const allChecked = visibleItems.every(item => item.checked === 1);
    const newValue = allChecked ? 0 : 1;
    
    const updatedItems = form.items.map(item => 
      item.deleted ? item : { ...item, checked: newValue }
    );
    
    setForm({
      ...form,
      items: updatedItems,
    });
  };

  const areAllItemsChecked = () => {
    const visibleItems = form.items.filter(item => !item.deleted);
    return visibleItems.length > 0 && visibleItems.every(item => item.checked === 1);
  };

  const areSomeItemsChecked = () => {
    return form.items.filter(item => !item.deleted).some(item => item.checked === 1);
  };

  const updateSwipeState = (index: number, updates: Partial<{offset: number, showDelete: boolean, isDragging: boolean}>) => {
    setSwipeStates(prev => ({
      ...prev,
      [index]: {
        ...{
          offset: 0,
          showDelete: false,
          isDragging: false
        },
        ...prev[index],
        ...updates
      }
    }));
  };

  const handleSwipeStart = (index: number, clientX: number) => {
    updateSwipeState(index, { isDragging: true });
    setIsDraggingAny(true);
  };

  const handleSwipeMove = (index: number, clientX: number, startX: number) => {
    const currentState = swipeStates[index];
    if (!currentState?.isDragging) return;
    
    const offset = startX - clientX;
    if (offset > 0) {
      const newOffset = Math.min(offset, 120);
      updateSwipeState(index, { 
        offset: -newOffset,
        showDelete: newOffset > 60
      });
    }
  };

  const handleSwipeEnd = (index: number) => {
    const currentState = swipeStates[index];
    if (!currentState) return;
    
    updateSwipeState(index, { isDragging: false });
    setIsDraggingAny(false);
    
    if (Math.abs(currentState.offset) < 60) {
      updateSwipeState(index, { offset: 0, showDelete: false });
    }
  };

  const confirmDeleteItem = (index: number) => {
    onUpdateItem("deleted", true, index);
    updateSwipeState(index, { offset: 0, showDelete: false });
  };

  const cancelDeleteItem = (index: number) => {
    updateSwipeState(index, { offset: 0, showDelete: false });
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

        <div className="w-full mt-4 overflow-hidden relative">
        
        {Object.entries(swipeStates).map(([index, state]) => {
          if (!state.showDelete) return null;
          const itemIndex = parseInt(index);
          const item = form.items[itemIndex];
          if (!item || item.deleted) return null;
          
          const visibleIndex = form.items.filter((_, i) => i <= itemIndex && !form.items[i].deleted).length - 1;
          const rowHeight = 26;
          const headerHeight = 25;
          const topPosition = headerHeight + (visibleIndex * rowHeight);
          
          return (
            <div 
              key={`delete-buttons-${itemIndex}`}
              className="absolute left-0 flex items-center gap-2 bg-red-500 px-0.5 z-20"
              style={{ 
                width: '100%', 
                height: `${rowHeight}px`,
                top: `${topPosition}px`
              }}
            >
              <div className="w-full flex justify-end gap-0.5">
                <button
                  type="button"
                  onClick={() => confirmDeleteItem(itemIndex)}
                  className="bg-white text-red-500 px-2 py-1 rounded text-xs font-semibold hover:bg-red-50 flex items-center gap-1"
                >
                  <FiTrash size={10} /> Deletar
                </button>
                <button
                  type="button"
                  onClick={() => cancelDeleteItem(itemIndex)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          );
        })}
        
        <table className="w-full table list-table">
          <thead>
            <tr className="text-gray-600 bg-gray-300 text-sm">
              <th className="p-1 w-[5%]">
                <button
                  type="button"
                  onClick={toggleAllItems}
                  className="flex items-center justify-center w-full h-full text-gray-600 hover:text-gray-800 transition-colors"
                  title={areAllItemsChecked() ? "Desmarcar todos" : "Marcar todos"}
                >
                  {areAllItemsChecked() ? (
                    <FiCheckSquare size={16} />
                  ) : areSomeItemsChecked() ? (
                    <FiSquare size={16} className="opacity-50" />
                  ) : (
                    <FiSquare size={16} />
                  )}
                </button>
              </th>
              <th>QTD.</th>
              <th>PRODUTO</th>
              <th>PREÇO</th>
              <th className="p-1 w-[5%]">
                <FiMenu size={14} className="text-gray-500 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, originalIndex) => {
              if (item.deleted) return null;
              
              const swipeState = swipeStates[originalIndex] || { offset: 0, showDelete: false, isDragging: false };
              const visibleIndex = form.items.filter((_, i) => i <= originalIndex && !form.items[i].deleted).length - 1;
              
              return (
                <tr
                  key={`${originalIndex}${item.purchase_list_id}${item.id}`}
                  className={`py-0 border ${visibleIndex % 2 == 0 ? "bg-white" : "bg-gray-100"} relative overflow-hidden`}
                  style={{ 
                    transform: `translateX(${swipeState.offset}px)`,
                    transition: swipeState.isDragging ? 'none' : 'transform 0.3s ease',
                    touchAction: 'pan-y'
                  }}
                  onTouchStart={(e) => {
                    // Só prevenir se o toque for na última coluna (handle)
                    const target = e.target as HTMLElement;
                    const isHandle = target.closest('[data-drag-handle]');
                    if (isHandle) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                    <td className="p-1 w-[5%] border">
                      <CheckInput
                        label=""
                        checked={form.items[originalIndex].checked == 1}
                        onChangeVal={(value) => onUpdateItem("checked", value, originalIndex)}
                      />
                    </td>
                    <td className="w-[8%] border">
                      <InputDiv
                        onlyNumbers={true}
                        value={form.items[originalIndex].quantity}
                        onInput={(event) =>
                          onUpdateItem(
                            "quantity",
                            isNaN(parseInt((event.target as any).innerText))
                              ? ""
                              : parseInt((event.target as any).innerText),
                            originalIndex
                          )
                        }
                        inputMode="decimal"
                        externalClassName="text-center"
                      />
                    </td>
                    <td className="w-[60%] border">
                      <InputDiv
                        value={form.items[originalIndex].product}
                        onInput={(event) =>
                          onUpdateItem("product", (event.target as any).innerText, originalIndex)
                        }
                      />
                    </td>
                    <td className="w-[17%] border text-left">
                      <InputDiv
                        value={helper.formatNumber(form.items[originalIndex].unitary_value, 2)}
                        onInput={(event) => handleNumberChange(event, "unitary_value", originalIndex)}
                        inputMode="decimal"
                      />
                    </td>
                    <td className="w-[5%] border text-center">
                      <div
                        data-drag-handle
                        className="cursor-grab active:cursor-grabbing hover:bg-gray-200 rounded inline-block transition-colors select-none"
                        style={{ 
                          touchAction: 'none',
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none'
                        }}
                        title="Arrastar para deletar"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const startX = e.clientX;
                          handleSwipeStart(originalIndex, startX);
                          
                          const handleMouseMove = (e: MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSwipeMove(originalIndex, e.clientX, startX);
                          };

                          const handleMouseUp = (e: MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSwipeEnd(originalIndex);
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };

                          document.addEventListener('mousemove', handleMouseMove, { passive: false });
                          document.addEventListener('mouseup', handleMouseUp, { passive: false });
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const startX = e.touches[0].clientX;
                          handleSwipeStart(originalIndex, startX);
                          // Salvar startX no elemento para usar no touchMove
                          (e.currentTarget as any).swipeStartX = startX;
                        }}
                        onTouchMove={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const touch = e.touches[0];
                          const startX = (e.currentTarget as any).swipeStartX || touch.clientX;
                          handleSwipeMove(originalIndex, touch.clientX, startX);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSwipeEnd(originalIndex);
                        }}
                        onTouchCancel={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSwipeEnd(originalIndex);
                        }}
                      >
                        <FiMenu size={14} className="text-gray-400" />
                      </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

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
