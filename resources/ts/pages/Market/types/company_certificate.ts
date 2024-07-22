import Model from "@/types/model";

export interface CompanyCertificate extends Model {
  name: string;
  certificate: string;
  expiration: string;
  password: string;
  company_id: string;
  expired?: boolean;
}