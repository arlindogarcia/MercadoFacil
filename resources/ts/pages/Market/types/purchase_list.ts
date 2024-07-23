import Model from "@/types/model";
import { PurchaseListItem } from "./purchase_list_item";

export interface PurchaseList extends Model {
  marketplace: string;
  budget: number;
  user_id: string | number;
  items: PurchaseListItem[];
}