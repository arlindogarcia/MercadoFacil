import { Company } from "../types/company";
import { newCompanyCertificate } from "./company_certificate";

export const newCompany = (): Company => {
  return {
    id: "",
    name: "",
    cpf_cnpj: "",
    uf: "",
    type: 0,
    user_id: "",
    science_type: 0,
    status: 0,
    capture_period: 0,
    certificate: newCompanyCertificate(),
  };
};
