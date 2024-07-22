import Model from "@/types/model";

export interface User extends Model {
    name: string;
    email: string;
    password: string;
    photo_name: string;
    admin: number;
    contract_id: number | null;
    asaas_current_subscription_id: number | null;
    asaas_current_customer_id: number | null;
    asaas_billing_status: string;
}