import LocalStorage from "@react-native-async-storage/async-storage";
export type LocalStorageKey = "CURRENT_THEME";

export const LocalStorageService = {
  setItem: (key: LocalStorageKey, value: string) => {
    LocalStorage.setItem(key, value);
  },
  getItem: (key: LocalStorageKey) => {
    return LocalStorage.getItem(key);
  },
  removeItem: (key: LocalStorageKey) => {
    LocalStorage.removeItem(key);
  },
};
