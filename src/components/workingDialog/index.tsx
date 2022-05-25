import React from "react"
import { Dialog, Box, HourglassEmptyIcon, Typography } from "src/UILibrary"

interface WorkingDialogProps {
  open: boolean
  description: string
}

export const WorkingDialog: React.FC<WorkingDialogProps> = ({ open, description }) => {
  return (
    <Dialog open={open}>
      <Box
        sx={{
          width: "500px",
          bgcolor: "primary.main",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: "2rem",
        }}
      >
        <HourglassEmptyIcon
          sx={{ width: "70px", height: "70px", color: "background.default", mb: "1.5rem" }}
        />
        <Typography.Heading sx={{ letterSpacing: "2px", color: "background.default" }}>
          {description}
        </Typography.Heading>
      </Box>
    </Dialog>
  )
}
