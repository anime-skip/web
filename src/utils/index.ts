export function as<T>(t: T): T {
  return t;
}

interface LocalStorageTypes {
  rememberMeChecked: boolean;
  username: string;
}
export function getPersistedValue<T extends keyof LocalStorageTypes>(
  key: T,
): LocalStorageTypes[T] | undefined {
  const storedObject = localStorage.getItem(key);
  if (storedObject == null) return undefined;
  return JSON.parse(storedObject)[key];
}

export function persistValue<T extends keyof LocalStorageTypes>(
  key: T,
  value: LocalStorageTypes[T],
): LocalStorageTypes[T] | undefined {
  localStorage.setItem(key, JSON.stringify({ [key]: value }));
  const storedObject = localStorage.getItem(key);
  if (storedObject == null) return undefined;
  return JSON.parse(storedObject)[key];
}
