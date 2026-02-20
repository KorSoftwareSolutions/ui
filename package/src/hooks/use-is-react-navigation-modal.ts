import { useEffect, useMemo } from "react";

type NavigationContainerRef =
  import("@react-navigation/native").NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;

let useCachedNavigationContainerRef: (() => NavigationContainerRef) | null =
  null;

export function useInitializeNavigationContainerRef() {
  useEffect(() => {
    try {
      const expoRouter = require("expo-router");
      if (expoRouter) {
        useCachedNavigationContainerRef = expoRouter.useNavigationContainerRef;
        return;
      }
      const reactNavigation = require("@react-navigation/native");
      if (reactNavigation) {
        useCachedNavigationContainerRef =
          reactNavigation.useNavigationContainerRef;
      }
    } catch (error) {
      console.warn(
        "[useIsReactNavigationModal] Failed to load navigation ref:",
        error,
      );
    }
  }, []);
}

const getIsModal = () => {
  const useNavigationContainerRef = useCachedNavigationContainerRef;

  if (!useNavigationContainerRef) {
    return false;
  }

  const navigationRef = useNavigationContainerRef();
  if (!navigationRef) {
    return false;
  }
  const state = navigationRef.getCurrentOptions();
  if (
    state &&
    "presentation" in state &&
    typeof state.presentation === "string"
  ) {
    return state.presentation === "modal";
  }
  return false;
};

export function useIsReactNavigationModal() {
  const isModal = useMemo(getIsModal, []);
  return isModal;
}
