export function isEmpty(value) {
  return value.trim() === "";
}

export function hasLettersAndNumbersOnly(value) {
  const einaiString = typeof value === "string";
  const exeiAlphanumeric = /^[A-Za-z0-9\s]+$/.test(value);
  const monoArithmoi = /^[0-9\s]*$/.test(value);
  return einaiString && exeiAlphanumeric && !monoArithmoi;
}

export function hasOnlyLetters(value) {
  return typeof value === "string" && /^[A-Za-z\s]+$/.test(value);
}

export function hasOnlyNumbers(value) {
  return typeof value === "string" && /^[0-9]+$/.test(value);
}

export function isValidEmail(value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}
