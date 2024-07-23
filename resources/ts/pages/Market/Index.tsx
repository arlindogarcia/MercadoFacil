import Layout from "@/layouts/Layout";
import { DefaultButton } from "@/components/DefaultButton";
import { Title } from "@/layouts/Layout/title";
import { Section } from "@/components/Section";
import React, { useEffect, useState } from "react";
import { PurchaseList } from "./types/purchase_list";
import axios, { AxiosResponse } from "axios";
import { ApiPaginationRes } from "../System/types/pagination";
import { FiPlus } from "react-icons/fi";
import { Link } from "@inertiajs/react";

export default () => {
  const [purchaseLists, setPurchaseLists] = useState<PurchaseList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const addPurchaseLists = (purchaseLists: PurchaseList[]) => {
    setPurchaseLists((oldValue) => {
      return [...oldValue, ...purchaseLists];
    });
  };

  const getPurchaseLists = async (page: number) => {
    const resp: AxiosResponse<ApiPaginationRes<PurchaseList[]>> = await axios.get(
      `/api/purchase-lists?page=${page}`
    );

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
            <DefaultButton externalClass="w-auto">Adicionar</DefaultButton>
          </Link>
        </React.Fragment>
      }
    >
      <div className="w-full flex flex-wrap">
        {purchaseLists.map((purchaseList) => (
          <div key={purchaseList.id} className="w-full md:w-1/3 p-2 bg-white shadow-md rounded-lg">
            <div className="w-full border-b font-semibold text-gray-600">Mercado</div>
          </div>
        ))}
        {purchaseLists.length === 0 && (
          <div className="w-full text-center font-semibold text-gray-600 text-lg">
            Nenhuma lista encontrada
          </div>
        )}
      </div>

      {currentPage != lastPage && (
        <DefaultButton
          size="sm"
          color="gray"
          externalClass="w-full flex items-center gap-1 justify-center"
        >
          <FiPlus /> Ver mais
        </DefaultButton>
      )}
    </Layout>
  );
};
