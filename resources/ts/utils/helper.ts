import { format, parseISO } from "date-fns";

const helper = {
  formatMoney(value: string | number, decimalDigits = 2) {
    if (!value) value = 0;
    if (typeof value == "string") {
      value = parseFloat(value);
    }
    return value.toLocaleString("pt-br", {
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
      style: "currency",
      currency: "BRL",
    });
  },
  formatValor(value: number | string, decimalDigits = 2): string {
    if (!value) value = 0;
    if (typeof value == "string") {
      value = parseFloat(value);
    }
    return value.toLocaleString("pt-br", {
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
    });
  },
  formatDate(date: string, template = "dd/MM/yyyy") {
    if (!date) {
      return "";
    }
    try {
      return format(parseISO(date), template);
    } catch (err) {
      console.log('formatDate err ', err);
      return '';
    }
  },
  getCurrentDate(template = "dd/MM/yyyy") {
    return format(new Date(), template);
  },
  formatCPFOrCNPJ(value: string): string {
    const cleanedInput = value.replace(/\D/g, "");

    if (cleanedInput.length === 11) {
      return cleanedInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    if (cleanedInput.length === 14) {
      return cleanedInput.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    return value;
  },
  formatNumber(val: number | string, decimalPlaces = 2) {
    let returnValue = '0';
    if (typeof val === "number") {
      returnValue = val
        .toFixed(decimalPlaces)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      returnValue = parseFloat(val)
        .toFixed(decimalPlaces)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return returnValue;
  },
};
export default helper;
