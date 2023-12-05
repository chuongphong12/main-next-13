export const formatCurrency = (value: any) => {
  if (!value && value !== 0) return
  return value?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

}
