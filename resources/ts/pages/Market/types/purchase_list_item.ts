import Model from "@/types/model";

export interface PurchaseListItem extends Model {
  purchase_list_id: string | number;
  checked: number;
  quantity: number;
  product: string;
  unitary_value: number;
  deleted?: boolean;
}