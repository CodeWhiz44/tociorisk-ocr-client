import React from "react"
import { Box, Typography, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"

interface GroupActionsProps {
  disabled: boolean
  onDownloadFiles: Function
  onUpdateDocuments: Function
  isEditable: boolean
  setIsEditable: Function
  onArchiveDocuments: Function
}

export const GroupActions: React.FC<GroupActionsProps> = ({
  disabled,
  onDownloadFiles,
  onUpdateDocuments,
  isEditable,
  setIsEditable,
  onArchiveDocuments,
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
      {isEditable ? (
        <>
          <Button
            role="action"
            sx={{ mr: "0.5rem", letterSpacing: "2px" }}
            onClick={() => setIsEditable(false)}
          >
            {t("common.return_without_save")}
          </Button>
          <Button role="submit" sx={{ letterSpacing: "2px" }} onClick={() => onUpdateDocuments()}>
            {t("common.save")}
          </Button>
        </>
      ) : (
        <>
          <Typography.Action sx={{ color: "primary.main", fontWeight: 600, mr: "1rem" }}>
            {t("file.group_process")}
          </Typography.Action>
          <Button
            role="submit"
            sx={{ mr: "0.5rem", letterSpacing: "2px" }}
            disabled={disabled}
            onClick={() => onDownloadFiles("pdf")}
          >
            {t("file.download_original")}
          </Button>
          <Button
            role="submit"
            sx={{ mr: "0.5rem", letterSpacing: "2px" }}
            disabled={disabled}
            onClick={() => onDownloadFiles("xls")}
          >
            {t("file.download_output")}
          </Button>
          <Button
            role="submit"
            sx={{ mr: "0.5rem", letterSpacing: "2px", minWidth: 0 }}
            disabled={disabled}
            onClick={() => setIsEditable(true)}
          >
            {t("file.edit")}
          </Button>
          <Button
            role="submit"
            sx={{ letterSpacing: "2px", minWidth: 0 }}
            disabled={disabled}
            onClick={() => onArchiveDocuments()}
          >
            {t("file.delete")}
          </Button>
        </>
      )}
    </Box>
  )
}
