import React from "react"
import {
  UnfoldMoreIcon,
  KeyboardDoubleArrowDownIcon,
  KeyboardDoubleArrowUpIcon,
} from "src/UILibrary"

interface SortIconProps {
  fieldName: string
  sortBy: string
  sortOrder: string
}

export const SortIcon: React.FC<SortIconProps> = ({ fieldName, sortBy, sortOrder }) => {
  return (
    <>
      {sortBy === fieldName ? (
        <>
          {sortOrder === "asc" ? (
            <KeyboardDoubleArrowUpIcon sx={{ width: "16px", height: "16px", mr: "0.125rem" }} />
          ) : (
            <KeyboardDoubleArrowDownIcon sx={{ width: "16px", height: "16px", mr: "0.125rem" }} />
          )}
        </>
      ) : (
        <UnfoldMoreIcon sx={{ width: "20px", height: "20px" }} />
      )}
    </>
  )
}
