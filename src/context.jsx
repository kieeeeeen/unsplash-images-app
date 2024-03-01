import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("dog");

  // useState là "bộ khởi tạo" giá trị ban đầu
  const [isDarkTheme, setIsDarkTheme] = useState(
    JSON.parse(localStorage.getItem("darkTheme"))
  );

  //nếu không reload lại trang
  //thì giá trị của isDarkTheme sẽ chỉ được thay đổi bởi useEffect
  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(isDarkTheme));
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const toggleDarkTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
