import React from "react"
import { Box } from "src/UILibrary"

import { Sidebar } from "./components/sidebar"

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "primary.contrastText",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
