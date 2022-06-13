import { useState, useEffect, createContext, useContext } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
	:root {
		color-scheme: ${({ appearance }) =>
      appearance === "light" ? "light" : "dark"};
	}
	body[data-theme="light"] {
		--b-100: white;
		--c-100: black;
	}

	body[data-theme="night"] {
		--b-100: black;
		--c-100: white;
	}

	body {
		background-color: var(--b-100);
		color: var(--c-100);
		height: 200vh;
	}
`;

const App = createContext();
export const useApp = () => useContext(App);

export const AppProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [appearance, setAppearance] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("theme")
  );

  const toggle = () =>
    appearance === "light" ? setAppearance("night") : setAppearance("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = appearance;
    window.localStorage.setItem("theme", appearance);
  }, [appearance]);

  const value = { toggle, appearance };

  return mounted ? (
    <App.Provider value={value}>
      <GlobalStyles appearance={appearance} />
      {children}
    </App.Provider>
  ) : null;
};
