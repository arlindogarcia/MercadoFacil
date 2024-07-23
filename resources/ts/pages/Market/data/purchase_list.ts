import { PurchaseList } from "../types/purchase_list";
import { newPurchaseListItem } from "./purchase_list_item";

export const newPurchaseList = (): PurchaseList => {
  return {
    id: "",
    marketplace: "",
    budget: 0,
    user_id: "",
    items: [{ ...newPurchaseListItem() }],
  };
};
