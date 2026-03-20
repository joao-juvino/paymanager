export type PaymentForm = {
  cnpj: string;
  companyName: string;
  amount: string;
  description: string;
};

export type Company = {
  name: string;
  cnpj: string;
};

export type PaymentRequest = {
  id: string;
  company: Company;
  date: string;
  amount: number;
  requester: string;
  description: string;
};