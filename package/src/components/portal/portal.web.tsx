import { useState } from "react";
import { createPortal } from "react-dom";
import { DEFAULT_PORTAL_HOST, type PortalProps } from "./portal.constants";

export function PortalHost() {
  return <></>;
}

/**
 * Prevent scroll-lock libraries (e.g. react-remove-scroll used by Radix/Vaul
 * modals) from blocking scroll events inside the portal. These libraries
 * register document-level wheel/touchmove listeners that call
 * preventDefault() on events originating outside their managed "shards".
 * Stopping propagation at the portal container keeps those handlers from
 * firing while still allowing native scroll within the portal content.
 */
function preventScrollLock(container: HTMLElement) {
  const stop = (e: Event) => e.stopPropagation();
  container.addEventListener("wheel", stop);
  container.addEventListener("touchmove", stop);
}

export function Portal({ name, hostName = DEFAULT_PORTAL_HOST, children }: PortalProps) {
  const [container] = useState(() => {
    let container = document.getElementById(hostName);

    if (!container) {
      container = document.createElement("div");
      container.id = hostName;
      container.style.pointerEvents = "auto";
      document.body.appendChild(container);
      preventScrollLock(container);
    }
    return container;
  });

  return <>{createPortal(children, container, name)}</>;
}
