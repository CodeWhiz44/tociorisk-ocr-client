import React, { useMemo, useCallback } from "react"
import {
  Dialog,
  Box,
  Typography,
  DropzoneAreaBase,
  FileObject,
  AddCircleOutlineIcon,
  Button,
} from "src/UILibrary"
import { useTranslation } from "react-i18next"

import { UploadTable } from "src/components/uploadTable"

import { UploadFile } from "src/types/file"

const MAX_COUNT = 15

interface UploadFilesProps {
  open: boolean
  setOpen: Function
  onStart: Function
  files: UploadFile[]
  setFiles: Function
}

export const UploadFiles: React.FC<UploadFilesProps> = ({
  open,
  setOpen,
  onStart,
  files,
  setFiles,
}) => {
  const { t } = useTranslation()

  const deleteDisabled = useMemo(() => files.every((file) => !file.checked), [files])

  const readPDFs = useCallback(
    (newFiles: FileObject[]) => {
      setFiles(
        [
          ...files,
          ...newFiles.map((file) => ({
            pdf: file.file,
            propertyName: "",
            projectName: "",
            companyName: "",
            description: "",
            assignedPerson: "",
            checked: false,
          })),
        ].slice(0, MAX_COUNT)
      )
    },
    [files, setFiles]
  )

  const handleChange = (fileIndex: number, field: string, value: any) => {
    setFiles(
      files.map((file, index) =>
        index === fileIndex || fileIndex === -1 ? { ...file, [field]: value } : { ...file }
      )
    )
  }

  const handleAllCheckChange = (value: boolean) => {
    setFiles(files.map((file) => ({ ...file, checked: value })))
  }

  const handleDelete = () => {
    setFiles(files.filter((file) => !file.checked))
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
      <Box sx={{ bgcolor: "background.default" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "1rem 1.375rem",
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            borderColor: "text.disabled",
          }}
        >
          <Typography.DetailHeading sx={{ color: "primary.main", mr: "1rem" }}>
            {t("file.upload_files")}
          </Typography.DetailHeading>
          <Typography.Detail sx={{ color: "text.primary", fontWeight: 400 }}>
            {t("file.upload_files_help")}
          </Typography.Detail>
        </Box>
        <Box sx={{ p: "1.5rem 1.875rem" }}>
          {!files.length ? (
            <Box
              sx={{
                "& .MuiDropzoneArea-root": {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiTypography-root": {
                    mt: 0,
                  },
                },
              }}
            >
              <DropzoneAreaBase
                dropzoneText={t("file.upload_dropzone_text")}
                acceptedFiles={[".pdf"]}
                showPreviewsInDropzone={false}
                onAdd={readPDFs}
                filesLimit={MAX_COUNT}
                maxFileSize={52428800} // 50MB
                fileObjects={[]}
                showAlerts={false}
              />
            </Box>
          ) : (
            <Box>
              <UploadTable
                files={files}
                handleChange={handleChange}
                handleAllCheckChange={handleAllCheckChange}
              />
              <Box
                sx={{
                  ml: "1.5rem",
                  p: "0.375rem 0.75rem",
                  bgcolor: "text.disabled",
                  mb: "0.5rem",
                  "& .MuiDropzoneArea-root": {
                    borderWidth: "1px",
                    borderColor: "secondary.main",
                    minHeight: 0,
                    "& .MuiDropzoneArea-textContainer": {
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      p: "0.5rem 1rem",
                      "& svg": {
                        width: "20px",
                        height: "20px",
                        color: "secondary.main",
                      },
                      "& .MuiTypography-root": {
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: "0.75rem",
                        letterSpacing: "2px",
                        color: "secondary.main",
                        px: "0.375rem",
                      },
                    },
                  },
                }}
              >
                <DropzoneAreaBase
                  Icon={AddCircleOutlineIcon}
                  dropzoneText={t("file.upload_more_help_end", { count: MAX_COUNT - files.length })}
                  acceptedFiles={[".pdf"]}
                  showPreviewsInDropzone={false}
                  onAdd={readPDFs}
                  filesLimit={MAX_COUNT}
                  maxFileSize={52428800} // 50MB
                  fileObjects={[]}
                  showAlerts={false}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  ml: "1.5rem",
                }}
              >
                <Button
                  disabled={deleteDisabled}
                  sx={{ p: "0.5rem 1.875rem", letterSpacing: 0 }}
                  onClick={handleDelete}
                >
                  {t("file.delete_selected_files")}
                </Button>
                <Button
                  role="submit"
                  sx={{ p: "0.5rem 1.875rem", lineHeight: "0.875rem", letterSpacing: 0 }}
                  onClick={() => onStart()}
                >
                  {t("file.upload")}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}
