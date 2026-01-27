import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

export function useFirstEffect(effect: EffectCallback, deps: DependencyList) {
  const isFirstEffect = useRef(true);

  useEffect(() => {
    if (isFirstEffect.current) {
      isFirstEffect.current = false;
      return;
    }

    return effect();
  }, deps);
}
