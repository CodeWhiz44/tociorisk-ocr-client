import React from "react"
import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material"

export const Tooltip: React.FC<TooltipProps> = ({ children, ...sx }) => {
  return (
    <MuiTooltip
      componentsProps={{
        tooltip: {
          sx: {
            "& .MuiTooltip-tooltip": {},
            mt: "0.25rem !important",
          },
        },
      }}
      {...sx}
    >
      {children}
    </MuiTooltip>
  )
}
