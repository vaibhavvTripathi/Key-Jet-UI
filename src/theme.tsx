import { createContext, useState, useMemo } from "react";
import { Theme, createTheme } from "@mui/material";

// color design tokens

export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#d0d1d2",
          200: "#a1a4a5",
          300: "#727678",
          400: "#43494b",
          500: "#141b1e",
          600: "#101618",
          700: "#0c1012",
          800: "#080b0c",
          900: "#040506",
        },
        secondary: {
          100: "#f7f7f8",
          200: "#eff0f0",
          300: "#e8e8e9",
          400: "#e0e1e1",
          500: "#d8d9da",
          600: "#adaeae",
          700: "#828283",
          800: "#565757",
          900: "#2b2b2c",
        },
        greyAccent: {
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
        },

        redAccent: {
          100: "#efdade",
          200: "#dfb5bd",
          300: "#d0919b",
          400: "#c06c7a",
          500: "#b04759",
          600: "#8d3947",
          700: "#6a2b35",
          800: "#461c24",
          900: "#230e12",
        },

        greenAccent: {
          100: "#cce6cc",
          200: "#99cc99",
          300: "#66b366",
          400: "#339933",
          500: "#008000",
          600: "#006600",
          700: "#004d00",
          800: "#003300",
          900: "#001a00",
        },
      }
    : {
        primary: {
          100: "#dadce1",
          200: "#b4b9c3",
          300: "#8f96a5",
          400: "#697387",
          500: "#445069",
          600: "#364054",
          700: "#29303f",
          800: "#1b202a",
          900: "#0e1015",
        },
        secondary: {
          100: "#f7f7f8",
          200: "#eff0f0",
          300: "#e8e8e9",
          400: "#e0e1e1",
          500: "#d8d9da",
          600: "#adaeae",
          700: "#828283",
          800: "#565757",
          900: "#2b2b2c",
        },
        greyAccent: {
          100: "#e6e6e6",
          200: "#cccccc",
          300: "#b3b3b3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
        },

        redAccent: {
          100: "#efdade",
          200: "#dfb5bd",
          300: "#d0919b",
          400: "#c06c7a",
          500: "#b04759",
          600: "#8d3947",
          700: "#6a2b35",
          800: "#461c24",
          900: "#230e12",
        },

        greenAccent: {
          100: "#cce6cc",
          200: "#99cc99",
          300: "#66b366",
          400: "#339933",
          500: "#008000",
          600: "#006600",
          700: "#004d00",
          800: "#003300",
          900: "#001a00",
        },
      }),
});

export const themeSettings = (mode: any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.greyAccent[700],
              main: colors.greyAccent[500],
              light: colors.greyAccent[100],
            },
            background: {
              default: colors.primary[500],
            },
            text1: {
              main: colors.greyAccent[600],
              light: colors.greyAccent[200],
            },
            text2: {
              main: colors.redAccent[500],
              light: colors.redAccent[700],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.greyAccent[700],
              main: colors.greyAccent[500],
              light: colors.greyAccent[100],
            },
            background: {
              default: "#F5F5F5",
            },
            text1: {
              main: colors.greyAccent[300],
              light: colors.greenAccent[400],
            },
            text2: {
              main: colors.redAccent[500],
              light: colors.redAccent[400],
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 22,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 18,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
}>({
  toggleColorMode: () => {},
});

export const useMode = (): [Theme, { toggleColorMode: () => void }] => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
