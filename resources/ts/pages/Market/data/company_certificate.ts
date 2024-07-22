import { CompanyCertificate } from "../types/company_certificate";

export const newCompanyCertificate = (): CompanyCertificate => {
  return {
    id: "",
    name: "",
    certificate: "",
    expiration: "",
    password: "",
    company_id: "",
  };
};
