"use client";
import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { colors } from "./colors";

const ThemeRepository = ({ children }: { children: React.ReactNode }) => {
  const themeOptions: ThemeOptions = {
    palette: {
      ...colors,
    },
    typography: {},
    mixins: {},
    shape: {},
    breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      unit: "px",
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {},
          arrow: {},
        },
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeRepository;
