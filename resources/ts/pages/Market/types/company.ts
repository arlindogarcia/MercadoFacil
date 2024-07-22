import Model from "@/types/model";
import { CompanyCertificate } from "./company_certificate";

export interface Company extends Model {
  name: string;
  cpf_cnpj: string;
  type: number;
  uf: string;
  user_id: string;
  science_type: number;
  status: number;
  capture_period: number;
  certificate: CompanyCertificate;
  science_type_name?: string;
  status_name?: string;
  status_dfe?: string;
  status_dfe_cte?: string;
  last_date_query_dfe_nfe?: string;
  first_date_query_dfe_nfe?: string;
  last_date_query_dfe_cte?: string;
  first_date_query_dfe_cte?: string;
}