import { ThemeProvider } from "styled-components";
import GlobalStyles from "./globalStyle";
import theme, { GlobalTheme } from "./theme";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

interface GlobalThemeProviderProps {
  children: React.ReactNode;
}

const muiTheme = createTheme({
  // MUI theme 설정
});

export default function GlobalThemeProvider({ children }: GlobalThemeProviderProps) {
  const globalTheme: GlobalTheme = {
    ...theme,
  };

  return (
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={globalTheme}>
        {children}
        <GlobalStyles />
      </ThemeProvider>
    </MUIThemeProvider>
  );
}
