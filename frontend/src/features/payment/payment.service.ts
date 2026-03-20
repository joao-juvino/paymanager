import api from "../../services/api";
import type { PaymentForm } from "../../types/payment";

export async function createPayment(payload: PaymentForm) {
  try {
    const { data } = await api.post("/payments", payload);
    return data;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message || "Failed to create payment";
      throw new Error(message);
    }

    throw new Error("Network error. Try again.");
  }
}

export async function getMyPayments() {
  try {
    const { data } = await api.get("/payments");
    return data;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message || "Failed to fetch payments";
      throw new Error(message);
    }

    throw new Error("Network error. Try again.");
  }
}