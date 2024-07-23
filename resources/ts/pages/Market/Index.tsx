import Layout from "@/layouts/Layout";
import { DefaultButton } from "@/components/DefaultButton";
import { Title } from "@/layouts/Layout/title";
import React, { useEffect, useState } from "react";
import { PurchaseList } from "./types/purchase_list";
import axios, { AxiosResponse } from "axios";
import { ApiPaginationRes } from "../System/types/pagination";
import { FiEdit, FiPlus } from "react-icons/fi";
import { Link } from "@inertiajs/react";
import helper from "@/utils/helper";

export default () => {
  const [purchaseLists, setPurchaseLists] = useState<PurchaseList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const addPurchaseLists = (purchaseLists: PurchaseList[]) => {
    setPurchaseLists((oldValue) => {
      return [...oldValue, ...purchaseLists];
    });
  };

  const getPurchaseLists = async (page: number) => {
    setIsLoading(true);
    const resp: AxiosResponse<ApiPaginationRes<PurchaseList[]>> = await axios.get(
      `/api/purchase-lists?page=${page}`
    );
    setIsLoading(false);

    addPurchaseLists(resp.data.data);
    setCurrentPage(page);
    setLastPage(resp.data.last_page);
    console.log("getPurchaseLists", resp.data);
  };

  useEffect(() => {
    getPurchaseLists(1);
  }, []);

  return (
    <Layout
      header={
        <React.Fragment>
          <Title>Listas de Compra</Title>
          <Link href="/purchase-lists/new">
            <DefaultButton externalClass="w-auto flex gap-1 justify-center items-center">
              <FiPlus /> Adicionar
            </DefaultButton>
          </Link>
        </React.Fragment>
      }
    >
      <div className="w-full flex flex-wrap max-w-[500px] mx-auto">
        {purchaseLists.map((purchaseList) => (
          <Link
            className="w-full p-2 bg-white hover:bg-gray-100 shadow-md rounded-lg mb-4 cursor-pointer"
            as="div"
            key={purchaseList.id}
            href={`/purchase-lists/${purchaseList.id}`}
          >
            <div className="w-full border-b font-bold text-gray-600 pb-1 mb-2 flex items-center relative">
              <span className="text-lg">
                MERCADO {(purchaseList.marketplace ?? "").toUpperCase()}
              </span>
              <span className="font-semibold text-gray-500 ml-1">
                ({purchaseList.items.length} {purchaseList.items.length === 1 ? "item" : "itens"})
              </span>
              <span className="absolute top-0 right-0">
                <FiEdit />
              </span>
            </div>
            <div className="w-full flex flex-wrap mt-3 pb-3 border-b">
              <div className="w-1/3 text-center">
                <span className="font-semibold text-gray-600">ORÇAMENTO</span>
                <br />
                <span className="font-base text-gray-500">
                  {helper.formatMoney(purchaseList.budget)}
                </span>
              </div>
              <div className="w-1/3 text-center">
                <span className="font-semibold text-gray-600">MARCADO</span>
                <br />
                <span className="font-base text-gray-500">
                  {helper.formatMoney(purchaseList.marked)}
                </span>
              </div>
              <div className="w-1/3 text-center">
                <span className="font-semibold text-gray-600">SALDO</span>
                <br />
                <span className="font-base text-gray-500">
                  {helper.formatMoney(purchaseList.balance)}
                </span>
              </div>
            </div>
            <div className="w-full pt-1.5 text-center text-xs font-semibold text-gray-500">
              {helper.formatDate(purchaseList?.created_at ?? "", "dd/MM/yyyy HH:mm")}
            </div>
          </Link>
        ))}
        {purchaseLists.length === 0 && !isLoading && (
          <div className="w-full text-center font-semibold text-gray-600 text-lg">
            Nenhuma lista encontrada
          </div>
        )}
        {isLoading && (
          <div className="w-full text-center font-semibold text-gray-600 text-lg mt-2">
            Carregando...
          </div>
        )}
      </div>

      {currentPage != lastPage && !isLoading && (
        <DefaultButton
          size="sm"
          color="gray"
          externalClass="w-full flex items-center gap-1 justify-center mt-2 max-w-[500px] mx-auto"
          onClick={() => getPurchaseLists(currentPage + 1)}
        >
          <FiPlus /> Ver mais
        </DefaultButton>
      )}
    </Layout>
  );
};
