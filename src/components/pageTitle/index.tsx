import React from "react"
import { Box, Typography } from "src/UILibrary"

interface PageTitleProps {
  title: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        borderWidth: "0 0 1px 0",
        borderStyle: "solid",
        borderColor: "text.disabled",
      }}
    >
      <Typography.Heading
        sx={{
          p: "1.5rem 2.25rem 1rem",
          color: "text.primary",
          fontWeight: 500,
          maxWidth: "calc(100vw - 280px)",
          mx: "auto",
        }}
      >
        {title}
      </Typography.Heading>
    </Box>
  )
}
