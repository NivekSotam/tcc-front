export const formatCpfCnpj = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
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

export const removeSpecialChars = (value: any) => {
  return value.replace(/\D/g, ""); // Remove caracteres não numéricos
};
