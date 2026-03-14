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

export function isCommaSeparatedWords(value) {
  if (!value || typeof value !== "string") return false;

  value = value.trim();
  if (!value) return false;

  const words = value.split(",").map((word) => word.trim());

  // Κανένα άδειο word (διπλά commas) diladi ,,
  // Μόνο γράμματα + αριθμοί + κενά
  // Κανένα άλλο διαχωριστικό (μόνο comma επιτρέπεται)
  return words.every((word) => {
    if (!word) return false; // Άδειο word

    // Επιτρέπονται: a-z A-Z 0-9 κενά ελληνικά
    // Απαγορεύονται: _ !@#$%^&*()-+=[]{}|;:'"<>?,./
    return /^[a-zA-Z0-9\u0370-\u03FF\s]*$/.test(word);
  });
}

export function isValidImageName(value) {
  if (typeof value !== "string") return false;

  value = value.trim();
  if (value === undefined) return false;
  if (value === "") return true;

  // Regex: alfanumeric + underscore + .png
  // ^[a-zA-Z0-9_]+ = όνομα (1+ χαρακτήρες)
  // \.png$ = ακριβώς .png στο τέλος
  return /^[a-zA-Z0-9_]+\.png$/.test(value);
}
