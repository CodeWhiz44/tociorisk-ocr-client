import React from "react"
import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material"
import { Done as DoneIcon } from "@mui/icons-material"

export const Checkbox: React.FC<CheckboxProps> = ({ sx, ...rest }) => {
  return (
    <MuiCheckbox
      sx={{
        width: "14px",
        height: "14px",
        borderWidth: "2px",
        borderColor: "text.disabled",
        borderStyle: "solid",
        borderRadius: 0,
        "& svg": {
          width: 12,
          height: 12,
        },
        ...sx,
      }}
      icon={<></>}
      checkedIcon={<DoneIcon />}
      {...rest}
    />
  )
}
