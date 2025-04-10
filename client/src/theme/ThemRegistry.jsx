"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { colors } from "./colors";

const themeOptions = {
  palette: {
    ...colors,
  },
  overrides: {},
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

const ThemeRepository = ({ children }) => {
  const theme = createTheme({
    ...themeOptions,
    palette: {
      ...themeOptions.palette,
      mode: themeOptions.palette.mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeRepository;
