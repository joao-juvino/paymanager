import type { UserRole } from "./user";
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Beneficiary {
  name: string;
  cnpj: string;
}

export interface History {
  id: string;
  date: string;
  beneficiary: Beneficiary;
  value: number;
  requester: string;
  authorizer: string;
  status: PaymentStatus;
}

export interface HistoryMeta {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface HistoryStatistics {
  totalRecords: number;
  authorizedValues: number;
  pendingQueue: number;
  approvalRate: number;
}

export interface HistoryResponse {
  items: History[];
  meta: HistoryMeta;
  statistics: HistoryStatistics;
}

export interface Payment {
  id: number;
  cnpj: string;
  companyName: string;
  amount: number;
  description: string;
  status: PaymentStatus;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    name: string | null;
    email: string;
    role: UserRole;
  };
}

export type AuthorizePaymentDto = {
  status: "APPROVED" | "REJECTED";
};

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

export interface PaymentRequest {
  id: string;
  company: Company;
  date: string;
  amount: number;
  requester: string;
  description: string;
  status: PaymentStatus;
}

export type Status = "Rejected" | "Authorized" | "Pending";
