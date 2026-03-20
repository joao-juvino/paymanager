import type { PaymentForm } from "../../../types/payment";

export function validatePayment(form: PaymentForm) {
  const errors: string[] = [];

  if (!form.cnpj) {
    errors.push("CNPJ é obrigatório");
  } else if (!/^\d{14}$/.test(form.cnpj.replace(/\D/g, ""))) {
    errors.push("CNPJ inválido");
  }

  if (!form.companyName || form.companyName.length < 3) {
    errors.push("Nome da empresa deve ter pelo menos 3 caracteres");
  }

  if (!form.amount) {
    errors.push("Valor é obrigatório");
  } else {
    const numeric = Number(
      form.amount.replace(/\D/g, "")
    );

    if (numeric <= 0) {
      errors.push("Valor deve ser maior que zero");
    }
  }

  if (!form.description || form.description.length < 10) {
    errors.push("Descrição deve ter pelo menos 10 caracteres");
  }

  return errors;
}