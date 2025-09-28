import { PurchaseListItem } from "../types/purchase_list_item";

export const newPurchaseListItem = (): PurchaseListItem => {
  return {
    id: "",
    purchase_list_id: "",
    checked: 0,
    quantity: 1,
    product: "",
    unitary_value: 0,
    deleted: false,
  };
};
