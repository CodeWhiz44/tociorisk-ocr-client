import React from "react"
import { Box, TableContainer, Table, TableBody, Typography, CircularProgress } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { AxiosError } from "axios"

import { DocumentTableHeader } from "./components/documentTableHeader"
import { DocumentTableItem } from "./components/documentTableItem"

import { DocumentItem } from "src/types/file"

interface DocumentTableProps {
  documents: DocumentItem[]
  setDocuments: Function
  setEditingDocuments?: Function
  isEditable?: boolean
  isLoading: boolean
  error: AxiosError | null
  pageNum: number
  pageCount: number
  sortBy: string
  sortOrder: string
  handleSort: Function
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  setDocuments,
  setEditingDocuments,
  isEditable,
  isLoading,
  error,
  pageNum,
  pageCount,
  sortBy,
  sortOrder,
  handleSort,
}) => {
  const { t } = useTranslation()

  const handleChecked = (id: number, value: boolean) => {
    setDocuments(
      documents.map((document) =>
        document.id === id ? { ...document, checked: value } : { ...document }
      )
    )
  }

  const handleUpdate = (id: number, field: string, value: string) => {
    !!setEditingDocuments &&
      setEditingDocuments(
        documents.map((document) =>
          document.id === id || id === -1 ? { ...document, [field]: value } : { ...document }
        )
      )
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "text.disabled",
        bgcolor: "background.default",
        ml: "1.5rem",
        display: "flex",
      }}
    >
      {!error ? (
        <Box sx={{ ml: "-1.5rem", display: "flex", overflowY: "overlay", flexDirection: "column" }}>
          <TableContainer sx={{ borderWidth: 0, minWidth: "1050px" }}>
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <DocumentTableHeader
                documents={documents}
                setDocuments={setDocuments}
                isEditable={!!isEditable}
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
              />
              {!isLoading && (
                <TableBody>
                  {!!documents.length &&
                    documents.map((document, index) => (
                      <DocumentTableItem
                        key={document.id}
                        document={document}
                        handleChecked={handleChecked}
                        handleUpdate={handleUpdate}
                        isEditable={!!isEditable}
                        index={index}
                        pageNum={pageNum}
                        pageCount={pageCount}
                      />
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {isLoading ? (
            <Box sx={{ p: "1.5rem", display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {!documents.length && (
                <Typography.DetailHeading
                  sx={{ color: "primary.main", textAlign: "center", p: "1.5rem" }}
                >
                  {t("file.no_documents")}
                </Typography.DetailHeading>
              )}
            </>
          )}
        </Box>
      ) : (
        <Typography.DetailHeading
          sx={{ flexGrow: 1, color: "error.main", textAlign: "center", p: "1.5rem" }}
        >
          {t("file.error_on_getting_documents")}
        </Typography.DetailHeading>
      )}
    </Box>
  )
}
