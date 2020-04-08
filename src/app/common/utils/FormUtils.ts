export function isValidString(str: string): boolean {
  return !(str == null || isEmptyString(str));
}

export function isEmptyString(str: string): boolean {
  return str.length === 0 || !str.trim();
}
