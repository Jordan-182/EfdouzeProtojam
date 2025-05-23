import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type CountContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CountContext = createContext<CountContextType>({
  count: 0,
  setCount: () => {},
});

export const CountProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState<number>(() => {
    const storedCount = localStorage.getItem("count");
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = (): CountContextType => {
  const context = useContext(CountContext);
  return context;
};
