export function objectWithKey(key: string, value: any): any {
  return (Array.isArray(value) && value.length > 0) ||
    (!Array.isArray(value) && value)
      ? { [key]: value }
      : { };
}
