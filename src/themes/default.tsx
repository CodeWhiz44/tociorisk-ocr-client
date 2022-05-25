import { createTheme } from "@mui/material/styles"

export const DefaultTheme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
      paper: "#FAFAFA",
    },
    primary: {
      main: "#003399",
      dark: "#CDECF5",
      light: "#F4F8FF",
      contrastText: "#F5F5F5",
    },
    secondary: {
      main: "#666666",
    },
    text: {
      primary: "#333333",
      secondary: "#231F20",
      disabled: "#E5E5E5",
    },
    error: {
      main: "#EB5757",
    },
    warning: {
      main: "#FFE604",
    },
    success: {
      main: "#FFFFFF",
    },
    info: {
      main: "#FFFFFF",
    },
  },
})
