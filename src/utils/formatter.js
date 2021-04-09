export const currencyFormatter = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumIntegerDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};
