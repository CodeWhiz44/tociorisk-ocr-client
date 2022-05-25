import React from "react"
import { Button as MuiButton, ButtonProps } from "@mui/material"

export const Button = ({
  role = "normal",
  children,
  sx,
  ...rest
}: ButtonProps & { role?: "normal" | "submit" | "link" | "action" }) => {
  return (
    <MuiButton
      sx={{
        minWidth: role === "link" ? "auto" : "120px",
        borderRadius: "0.25rem",
        borderWidth: role === "link" ? 0 : "1px",
        borderStyle: "solid",
        borderColor:
          role === "normal"
            ? "secondary.main"
            : role === "action"
            ? "text.disabled"
            : "primary.main",
        p: role === "link" ? 0 : role === "normal" ? "0.75rem" : "0.375rem 1.25rem",
        fontSize: role === "link" ? "0.75rem" : "0.875rem",
        lineHeight: role === "link" || role === "normal" ? "0.875rem" : "1.25rem",
        fontWeight: 700,
        textTransform: "none",
        color:
          role === "normal"
            ? "secondary.main"
            : role === "link"
            ? "primary.main"
            : role === "action"
            ? "secondary.main"
            : "background.default",
        backgroundColor:
          role === "submit" ? "primary.main" : role === "action" ? "text.disabled" : "transparent",
        letterSpacing: role === "link" || role === "submit" ? "5px" : "2px",
        "&:hover": {
          color: "primary.main",
        },
        "&:disabled": {
          color: "text.disabled",
          borderColor: "text.disabled",
          bgcolor: "primary.contrastText",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}
