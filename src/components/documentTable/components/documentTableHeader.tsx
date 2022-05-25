import React, { useMemo } from "react"
import { TableHead, TableRow, TableCell, Checkbox, Box, Typography } from "src/UILibrary"
import { useTranslation } from "react-i18next"

import { SortIcon } from "./sortIcon"

import { DocumentItem } from "src/types/file"

interface DocumentTableHeaderProps {
  documents: DocumentItem[]
  setDocuments: Function
  isEditable: boolean
  sortBy: string
  sortOrder: string
  handleSort: Function
}

export const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  documents,
  setDocuments,
  isEditable,
  sortBy,
  sortOrder,
  handleSort,
}) => {
  const { t } = useTranslation()

  const allChecked = useMemo(
    () => documents.every((document) => document.checked) && !!documents.length,
    [documents]
  )

  const isAvailable = useMemo(() => !!documents.length, [documents])

  const handleAllChecked = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDocuments(documents.map((document) => ({ ...document, checked: evt.target.checked })))
  }

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
            checked={allChecked}
            onChange={handleAllChecked}
            disabled={isEditable}
          />
        </TableCell>
        <TableCell sx={{ width: "40px", alignItems: "center" }}>{t("file.number")}</TableCell>
        <TableCell sx={{ width: "120px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("createdAt")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.registration_date")}
            </Typography.Action>
            <SortIcon fieldName="createdAt" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ width: "125px", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("fileName")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.file_name")}
            </Typography.Action>
            <SortIcon fieldName="fileName" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ width: "150px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("companyName")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.company_name")}
            </Typography.Action>
            <SortIcon fieldName="companyName" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ width: "125px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("projectName")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.project_name")}
            </Typography.Action>
            <SortIcon fieldName="projectName" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ width: "150px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("propertyName")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.property_name")}
            </Typography.Action>
            <SortIcon fieldName="propertyName" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ alignItems: "center", minWidth: "150px" }}>{t("file.memo")}</TableCell>
        <TableCell sx={{ width: "100px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("assignedTo")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.person_in_charge")}
            </Typography.Action>
            <SortIcon fieldName="assignedTo" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
        <TableCell sx={{ width: "100px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: isAvailable ? "pointer" : "auto",
            }}
            onClick={() => isAvailable && handleSort("createdBy")}
          >
            <Typography.Action
              sx={{ fontWeight: 600, color: "text.secondary", letterSpacing: "2px" }}
            >
              {t("file.submitter")}
            </Typography.Action>
            <SortIcon fieldName="createdBy" sortBy={sortBy} sortOrder={sortOrder} />
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
