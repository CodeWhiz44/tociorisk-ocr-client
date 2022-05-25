import React from "react"
import { TableHead, TableRow, TableCell, Checkbox } from "src/UILibrary"
import { useTranslation } from "react-i18next"

interface UploadTableHeaderProps {
  checked: boolean
  handleAllCheckChange: Function
}

export const UploadTableHeader: React.FC<UploadTableHeaderProps> = ({
  checked,
  handleAllCheckChange,
}) => {
  const { t } = useTranslation()

  return (
    <TableHead>
      <TableRow
        sx={{
          "&>th": {
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
            letterSpacing: "2px",
            borderWidth: 0,
            "&:not(:first-of-type)": {
              bgcolor: "text.disabled",
              p: "0.5rem",
            },
            "&:not(:first-of-type):not(:last-of-type)": {
              borderWidth: "0 1px 0 0",
              borderStyle: "solid",
              borderColor: "background.default",
            },
          },
        }}
      >
        <TableCell sx={{ width: "24px", p: 0 }}>
          <Checkbox
            sx={{ p: 0 }}
            checked={checked}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleAllCheckChange(evt.currentTarget.checked)
            }
          />
        </TableCell>
        <TableCell sx={{ width: "120px" }}>{t("file.file_name")}</TableCell>
        <TableCell>{t("file.company_name")}</TableCell>
        <TableCell sx={{ width: "150px" }}>{t("file.project_name")}</TableCell>
        <TableCell>{t("file.property_name")}</TableCell>
        <TableCell>{t("file.memo")}</TableCell>
        <TableCell sx={{ width: "150px" }}>{t("file.person_in_charge")}</TableCell>
      </TableRow>
    </TableHead>
  )
}
