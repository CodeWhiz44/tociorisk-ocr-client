import React from "react"
import { Dialog, Box, Typography, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"

interface ConfirmDialogProps {
  open: boolean
  setOpen: Function
  handleClick: Function
  description: string
  actionLabel: string
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  setOpen,
  handleClick,
  description,
  actionLabel,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <Box sx={{ p: "3.25rem", bgcolor: "background.default" }}>
        <Typography.DetailHeading sx={{ color: "primary.main", textAlign: "center", mb: "1.5rem" }}>
          {description}
        </Typography.DetailHeading>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button
            sx={{ minWidth: "100px", borderColor: "background.default", mr: "1.5rem" }}
            onClick={() => setOpen(false)}
          >
            {t("common.back")}
          </Button>
          <Button role="submit" sx={{ minWidth: "100px" }} onClick={() => handleClick()}>
            {actionLabel}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
