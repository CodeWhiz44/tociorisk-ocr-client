import React, { useState } from "react"

import { Box, SxProps, Typography } from "@mui/material"

interface ShowMoreTextPropType {
  lines?: number
  children: React.ReactNode
  sxProps: SxProps
}

export const ShowMoreText: React.FC<ShowMoreTextPropType> = ({ lines = 1, children, sxProps }) => {
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false)

  return (
    <Box sx={{ color: "text.primary" }}>
      {isMoreOpen ? (
        <Typography
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
            fontWeight: 400,
            wordBreak: "break-word",
            cursor: "pointer",
            ...sxProps,
          }}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          {children}
        </Typography>
      ) : (
        <Typography
          sx={{
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
            fontWeight: 400,
            wordBreak: "break-word",
            textOverflow: "ellipsis",
            overflow: "hidden",
            WebkitLineClamp: lines,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            cursor: "pointer",
            ...sxProps,
          }}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          {children}
        </Typography>
      )}
    </Box>
  )
}
