export const formatCpfCnpj = (value: string) => {
  // Remove caracteres não numéricos
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 11) {
    // Se o valor tem até 11 dígitos, é um CPF
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else {
    // Se o valor tem mais de 11 dígitos, é um CNPJ
    return cleanedValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
};

// Função para obter o valor sem caracteres especiais
export const getCleanedCpfCnpj = (value: string) => {
  // Remove caracteres não numéricos
  return value.replace(/\D/g, "");
};

export const removeSpecialChars = (value: any) => {
  return value.replace(/\D/g, ""); // Remove caracteres não numéricos
};

export const formatCurrency = (value: string) => {
  if (value) {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/[^\d,]/g, "");

    // Substitui a vírgula por ponto para converter em número
    const numericNumber = parseFloat(numericValue.replace(",", "."));

    return Number(numericNumber);
  }
};
