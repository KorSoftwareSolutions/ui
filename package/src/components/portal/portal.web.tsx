import { useState } from "react";
import { createPortal } from "react-dom";
import { DEFAULT_PORTAL_HOST, type PortalProps } from "./portal.constants";

export function PortalHost() {
  return <></>;
}

export function Portal({ name, hostName = DEFAULT_PORTAL_HOST, children }: PortalProps) {
  const [container] = useState(() => {
    let container = document.getElementById(hostName);

    if (!container) {
      container = document.createElement("div");
      container.id = hostName;
      container.style.pointerEvents = "auto";
      document.body.appendChild(container);
    }
    return container;
  });

  return <>{createPortal(children, container, name)}</>;
}
