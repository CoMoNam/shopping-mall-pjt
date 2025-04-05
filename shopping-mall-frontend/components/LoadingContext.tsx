"use client";
// vps wating
import { setLoadingSetter } from "@/lib/loadingGlobalSetter";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoadingSetter(setIsLoading);
  }, []);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
