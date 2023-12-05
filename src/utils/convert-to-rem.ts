export const convertToRem = (value: any) => {
  if (value && isNaN(value) === false) {
    return value / 16 + 'rem'
  }
  return value
}
