import { useContext, createContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("tr");

  const data = {
    theme,
    setTheme,
    language,
    setLanguage,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useData = () => useContext(Context);

export default Provider;
