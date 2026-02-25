import { createMMKV } from "react-native-mmkv";

export type LocalStorageKey = "CURRENT_THEME" | "CURRENT_COLOR_SCHEME";

const storage = createMMKV();

export const LocalStorageService = {
  set: (key: LocalStorageKey, value: string) => {
    storage.set(key, value);
  },
  get: (key: LocalStorageKey) => {
    return storage.getString(key);
  },
  remove: (key: LocalStorageKey) => {
    storage.remove(key);
  },
};
