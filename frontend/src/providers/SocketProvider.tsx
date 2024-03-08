import { ReactNode, createContext, useContext } from "react";

const Context = createContext(null);
export const SocketContext = () => useContext(Context);
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return <Context.Provider value={null}>{children}</Context.Provider>;
};
