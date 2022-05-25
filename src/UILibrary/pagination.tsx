import React from "react"
import { Pagination as MuiPagination, PaginationProps } from "@mui/material"

export const Pagination: React.FC<PaginationProps> = ({ sx, ...rest }) => {
  return (
    <MuiPagination
      shape="rounded"
      sx={{
        "& button": {
          fontSize: "0.75rem",
          width: "auto",
          minWidth: "28px",
          height: "28px",
          px: "0.125rem",
          "&:not(.Mui-selected)": {
            color: "secondary.main",
          },
          "&:hover": {
            color: "primary.main",
          },
        },
        ...sx,
      }}
      {...rest}
    />
  )
}
