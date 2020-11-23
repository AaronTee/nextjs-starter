export function getKeyByValue<T extends { [key: string]: any }>(
  object: T,
  value: keyof T
) {
  return Object.keys(object).find((key) => object[key] === value) as keyof T;
}
