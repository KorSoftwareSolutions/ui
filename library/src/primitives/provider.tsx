import { PortalHost } from "./portal";

export const UniversalUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <PortalHost />
    </>
  );
};
