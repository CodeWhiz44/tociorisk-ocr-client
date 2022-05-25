import React from "react"
import { Typography as MuiTypography, TypographyProps } from "@mui/material"

const TypographyComponentWithStyles = (defaultStyles: TypographyProps) => {
  const TextComponent = ({ children, ...rest }: TypographyProps) => {
    return (
      <MuiTypography {...defaultStyles} {...rest}>
        {children}
      </MuiTypography>
    )
  }

  return TextComponent
}

export const Typography = {
  Heading: TypographyComponentWithStyles({
    fontSize: "1.5em",
    lineHeight: "1.5rem",
    letterSpacing: "5px",
    fontWeight: 700,
  }),

  Title: TypographyComponentWithStyles({
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    fontWeight: 700,
    letterSpacing: "2px",
  }),

  DetailHeading: TypographyComponentWithStyles({
    fontSize: "1.125rem",
    lineHeight: "1.125rem",
    fontWeight: 700,
    letterSpacing: "2px",
  }),

  Detail: TypographyComponentWithStyles({
    fontSize: "0.875rem",
    lineHeight: "0.875rem",
    fontWeight: 500,
  }),

  Action: TypographyComponentWithStyles({
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    fontWeight: 400,
  }),
}
