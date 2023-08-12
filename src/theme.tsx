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
          100: "#ece9f5",
          200: "#d9d3eb",
          300: "#c5bde0",
          400: "#b2a7d6",
          500: "#9f91cc",
          600: "#7f74a3",
          700: "#5f577a",
          800: "#403a52",
          900: "#201d29",
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
          100: "#040506",
          200: "#080b0c",
          300: "#0c1012",
          400: "#101618",
          500: "#141b1e",
          600: "#43494b",
          700: "#727678",
          800: "#a1a4a5",
          900: "#d0d1d2",
        },
        secondary: {
          100: "#201d29",
          200: "#403a52",
          300: "#5f577a",
          400: "#7f74a3",
          500: "#9f91cc",
          600: "#b2a7d6",
          700: "#c5bde0",
          800: "#d9d3eb",
          900: "#ece9f5",
        },
        greyAccent: {
          100: "#1a1a1a",
          200: "#333333",
          300: "#4d4d4d",
          400: "#666666",
          500: "#808080",
          600: "#999999",
          700: "#b3b3b3",
          800: "#cccccc",
          900: "#e6e6e6",
        },
        redAccent: {
          100: "#230e12",
          200: "#461c24",
          300: "#6a2b35",
          400: "#8d3947",
          500: "#b04759",
          600: "#c06c7a",
          700: "#d0919b",
          800: "#dfb5bd",
          900: "#efdade",
        },
        greenAccent: {
          100: "#001a00",
          200: "#003300",
          300: "#004d00",
          400: "#006600",
          500: "#008000",
          600: "#339933",
          700: "#66b366",
          800: "#99cc99",
          900: "#cce6cc",
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
              main: colors.primary[300],
            },
            secondary: {
              main: colors.secondary[300],
            },
            neutral: {
              dark: colors.greyAccent[700],
              main: colors.greyAccent[500],
              light: colors.greyAccent[100],
            },
            background: {
              default: "#141b1e",
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
              main: colors.primary[300],
            },
            secondary: {
              main: colors.secondary[300],
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
              main: colors.greyAccent[600],
              light: colors.greenAccent[500],
            },
            text2: {
              main: colors.redAccent[500],
              light: colors.redAccent[500],
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
  mode: string;
}>({
  toggleColorMode: () => {},
  mode: "dark",
});

export const useMode = (): [Theme, { toggleColorMode: () => void, mode : string }] => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
