import React from "react"
import { Dialog, Box, Typography, LinearProgress } from "src/UILibrary"
import { useTranslation } from "react-i18next"

interface UploadProgressDialogProps {
  open: boolean
  maxCount: number
  uploadedCount: number
  uploadProgress: number
}

export const UploadProgressDialog: React.FC<UploadProgressDialogProps> = ({
  open,
  maxCount,
  uploadedCount,
  uploadProgress,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <Box sx={{ bgcolor: "background.default", p: "2.25rem 2.5rem" }}>
        <Typography.DetailHeading
          sx={{ mt: "0.85rem", mb: "1.625rem", color: "primary.main", textAlign: "center" }}
        >{`${t("file.uploading")}(${uploadedCount}/${maxCount})`}</Typography.DetailHeading>
        <Typography.Action
          sx={{ lineHeight: "0.75rem", mb: "0.25rem", fontWeight: 600, color: "primary.main" }}
        >
          {`${t("file.uploading_files")} ${uploadProgress}%`}
        </Typography.Action>
        <LinearProgress
          value={uploadProgress}
          variant="determinate"
          sx={{ height: "10px", bgcolor: "text.disabled", mb: "1rem" }}
        />
      </Box>
    </Dialog>
  )
}
