import React, { useMemo } from "react"
import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Tooltip,
  Typography,
  ShowMoreText,
  TextField,
  IconButton,
} from "src/UILibrary"

import { DocumentItem } from "src/types/file"
import { getRegisteredDate } from "src/modules/date"
import { BulkCopyIcon } from "src/assets/icons/BulkCopyIcon"

interface DocumentTableItemProps {
  document: DocumentItem
  handleChecked: Function
  handleUpdate: Function
  isEditable: boolean
  index: number
  pageNum: number
  pageCount: number
}

export const DocumentTableItem: React.FC<DocumentTableItemProps> = ({
  document,
  handleChecked,
  handleUpdate,
  isEditable,
  index,
  pageNum,
  pageCount,
}) => {
  const isFirst = useMemo(() => !index, [index])

  return (
    <TableRow
      sx={{
        "&>td": {
          borderWidth: 0,
          "&:not(:first-of-type)": {
            p: "0.375rem 0.5rem",
            borderWidth: "0 0 1px 0",
            borderStyle: "solid",
            borderColor: "primary.contrastText",
          },
          "&:not(:first-of-type):not(:last-of-type)": {
            borderRightWidth: "1px",
          },
        },
      }}
    >
      <TableCell sx={{ p: 0 }}>
        <Checkbox
          sx={{ p: 0 }}
          checked={document.checked}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            handleChecked(document.id, evt.target.checked)
          }
          disabled={isEditable}
        />
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        <Typography.Action
          sx={{
            textAlign: "center",
            color: document.isOCRComplete ? "text.primary" : "secondary.main",
          }}
        >
          {index + 1 + (pageNum - 1) * pageCount}
        </Typography.Action>
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        <Typography.Action
          sx={{ color: document.isOCRComplete ? "text.primary" : "secondary.main" }}
        >
          {getRegisteredDate(document.createdAt)}
        </Typography.Action>
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        <Typography.Action
          sx={{ color: document.isOCRComplete ? "text.primary" : "secondary.main" }}
        >
          {document.fileName}
        </Typography.Action>
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={document.companyName}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate(document.id, "companyName", evt.currentTarget.value)
              }
              sx={{
                mr: isFirst ? "0.25rem" : 0,
                "& .MuiOutlinedInput-root": {
                  bgcolor: document.isOCRComplete ? "background.default" : "primary.contrastText",
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  "& fieldset": {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: document.isOCRComplete ? "primary.contrastText" : "background.default",
                    "& fieldset": {
                      borderColor: "primary.contrastText",
                    },
                  },
                },
              }}
            />
            {isFirst && (
              <IconButton
                sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
                onClick={() => handleUpdate(-1, "companyName", document.companyName)}
              >
                <BulkCopyIcon size={30} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Tooltip title={document.companyName}>
            <Box>
              <Typography.Action
                sx={{
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {document.companyName}
              </Typography.Action>
            </Box>
          </Tooltip>
        )}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={document.projectName}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate(document.id, "projectName", evt.currentTarget.value)
              }
              sx={{
                mr: isFirst ? "0.25rem" : 0,
                "& .MuiOutlinedInput-root": {
                  bgcolor: document.isOCRComplete ? "background.default" : "primary.contrastText",
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  "& fieldset": {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: document.isOCRComplete ? "primary.contrastText" : "background.default",
                    "& fieldset": {
                      borderColor: "primary.contrastText",
                    },
                  },
                },
              }}
            />
            {isFirst && (
              <IconButton
                sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
                onClick={() => handleUpdate(-1, "projectName", document.projectName)}
              >
                <BulkCopyIcon size={30} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Tooltip title={document.projectName}>
            <Box>
              <Typography.Action
                sx={{
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {document.projectName}
              </Typography.Action>
            </Box>
          </Tooltip>
        )}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={document.propertyName}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate(document.id, "propertyName", evt.currentTarget.value)
              }
              sx={{
                mr: isFirst ? "0.25rem" : 0,
                "& .MuiOutlinedInput-root": {
                  bgcolor: document.isOCRComplete ? "background.default" : "primary.contrastText",
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  "& fieldset": {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: document.isOCRComplete ? "primary.contrastText" : "background.default",
                    "& fieldset": {
                      borderColor: "primary.contrastText",
                    },
                  },
                },
              }}
            />
            {isFirst && (
              <IconButton
                sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
                onClick={() => handleUpdate(-1, "propertyName", document.propertyName)}
              >
                <BulkCopyIcon size={30} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Tooltip title={document.propertyName}>
            <Box>
              <Typography.Action
                sx={{
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {document.propertyName}
              </Typography.Action>
            </Box>
          </Tooltip>
        )}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={document.description}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate(document.id, "description", evt.currentTarget.value)
              }
              sx={{
                mr: isFirst ? "0.25rem" : 0,
                "& .MuiOutlinedInput-root": {
                  bgcolor: document.isOCRComplete ? "background.default" : "primary.contrastText",
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  "& fieldset": {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: document.isOCRComplete ? "primary.contrastText" : "background.default",
                    "& fieldset": {
                      borderColor: "primary.contrastText",
                    },
                  },
                },
              }}
            />
            {isFirst && (
              <IconButton
                sx={{
                  p: "0.25rem",
                  "&:hover": { bgcolor: "transparent" },
                }}
                onClick={() => handleUpdate(-1, "description", document.description)}
              >
                <BulkCopyIcon size={30} />
              </IconButton>
            )}
          </Box>
        ) : (
          <ShowMoreText
            sxProps={{ color: document.isOCRComplete ? "text.primary" : "secondary.main" }}
          >
            {document.description}
          </ShowMoreText>
        )}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        {isEditable ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value={document.assignedTo}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                handleUpdate(document.id, "assignedTo", evt.currentTarget.value)
              }
              sx={{
                mr: isFirst ? "0.25rem" : 0,
                "& .MuiOutlinedInput-root": {
                  bgcolor: document.isOCRComplete ? "background.default" : "primary.contrastText",
                  color: document.isOCRComplete ? "text.primary" : "secondary.main",
                  "& fieldset": {
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "transparent",
                    },
                  },
                  "&.Mui-focused": {
                    bgcolor: document.isOCRComplete ? "primary.contrastText" : "background.default",
                    "& fieldset": {
                      borderColor: "primary.contrastText",
                    },
                  },
                },
              }}
            />
            {isFirst && (
              <IconButton
                sx={{
                  p: "0.25rem",
                  "&:hover": { bgcolor: "transparent" },
                }}
                onClick={() => handleUpdate(-1, "assignedTo", document.assignedTo)}
              >
                <BulkCopyIcon size={30} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Typography.Action
            sx={{ color: document.isOCRComplete ? "text.primary" : "secondary.main" }}
          >
            {document.assignedTo}
          </Typography.Action>
        )}
      </TableCell>
      <TableCell
        sx={{
          backgroundColor: document.isOCRComplete ? "background.default" : "primary.contrastText",
        }}
      >
        <Typography.Action
          sx={{ color: document.isOCRComplete ? "text.primary" : "secondary.main" }}
        >
          {document.createdBy}
        </Typography.Action>
      </TableCell>
    </TableRow>
  )
}
