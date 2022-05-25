import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "@mui/material"

export const TextField: React.FC<TextFieldProps> = ({ children, sx, ...rest }) => {
  return (
    <MuiTextField
      sx={{
        bgcolor: "background.default",
        borderRadius: "0.25rem",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "text.disabled",
            borderRadius: "0.25rem",
          },
          "&.Mui-disabled": {
            "& fieldset": {
              borderColor: "text.disabled",
            },
          },
        },
        "& input": {
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          paddingX: "0.625rem",
          paddingY: "0.5rem",
          fontWeight: 500,
          borderRadius: "0.25rem",
          "&.Mui-disabled": {
            bgcolor: "text.disabled",
            WebkitTextFillColor: "#333333",
            color: "text.primary",
          },
        },
        "& textarea": {
          fontSize: "0.75rem",
          lineHeight: "1.25rem",
          fontWeight: 500,
        },
        "& .MuiInputLabel-shrink:not(.Mui-focused)": {
          color: "primary.light",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiTextField>
  )
}
