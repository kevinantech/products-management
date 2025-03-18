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
    fontFamily: "Inter",
  },
  components: {
    MuiModal: {
      styleOverrides: {
        root: {
          overflowY: "scroll",
          fontFamily: "Inter",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
          paddingTop: 4,
          paddingBottom: 4,
          borderRadius: 6,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
          "&:hover, &:focus, &:active": { boxShadow: "none" },
        },
      },
    },
  },
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <Provider theme={createTheme(theme)}>{children}</Provider>;
};

export default ThemeProvider;
