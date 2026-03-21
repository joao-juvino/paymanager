import api from "../../services/api";
import type { Payment, PaymentForm, PaymentStatus } from "../../types/payment";

export async function createPayment(payload: PaymentForm): Promise<Payment> {
  try {
    const { data } = await api.post("/payments", payload);
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data?.message || "Failed to create payment";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}

export async function getMyPayments(): Promise<Payment[]> {
  try {
    const { data } = await api.get("/payments/mine");
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data?.message || "Failed to fetch payments";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}

export async function getPendingPayments(): Promise<Payment[]> {
  try {
    const { data } = await api.get("/payments/pending");
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data?.message || "Failed to fetch pending payments";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}

export async function updatePaymentStatus(
  paymentId: number,
  status: PaymentStatus
): Promise<Payment> {
  try {
    const { data } = await api.patch(`/payments/${paymentId}/status`, { status });
    return data;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message || "Failed to update payment status";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}

export async function getAllPayments(): Promise<Payment[]> {
  try {
    const { data } = await api.get("/payments/all");
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = error.response.data?.message || "Failed to fetch payments";
      throw new Error(message);
    }
    throw new Error("Network error. Try again.");
  }
}