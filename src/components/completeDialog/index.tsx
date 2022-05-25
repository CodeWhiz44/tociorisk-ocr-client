import React from "react"
import { Dialog, Box, Typography, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"

interface CompleteDialogProps {
  open: boolean
  setOpen: Function
  description: String
}

export const CompleteDialog: React.FC<CompleteDialogProps> = ({ open, setOpen, description }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <Box sx={{ p: "3.25rem", bgcolor: "background.default" }}>
        <Typography.DetailHeading sx={{ color: "primary.main", textAlign: "center", mb: "1.5rem" }}>
          {description}
        </Typography.DetailHeading>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Button
            sx={{ minWidth: "100px", borderColor: "background.default" }}
            onClick={() => setOpen(false)}
          >
            {t("common.close")}
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
