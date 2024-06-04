import { ThemeProvider } from "styled-components";
import GlobalStyles from "./globalStyle";
import theme, { GlobalTheme } from "./theme";

interface GlobalThemeProviderProps {
  children: React.ReactNode;
}

export default function GlobalThemeProvider({ children }: GlobalThemeProviderProps) {
  const globalTheme: GlobalTheme = {
    ...theme,
  };

  return (
    <ThemeProvider theme={globalTheme}>
      {children}
      <GlobalStyles />
    </ThemeProvider>
  );
}
