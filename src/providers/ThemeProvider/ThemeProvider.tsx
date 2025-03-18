import {
  createTheme,
  ThemeProvider as Provider,
  ThemeOptions,
} from "@mui/material";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme: ThemeOptions = {
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    /* MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    }, */
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
          "&:hover, &:active": { boxShadow: "none" },
        },
      },
    },
  },
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <Provider theme={createTheme(theme)}>{children}</Provider>;
};

export default ThemeProvider;
