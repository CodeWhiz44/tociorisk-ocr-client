import React from "react"
import {
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Tooltip,
  Typography,
  TextField,
  IconButton,
} from "src/UILibrary"

import { UploadFile } from "src/types/file"
import { BulkCopyIcon } from "src/assets/icons/BulkCopyIcon"

interface UploadTableItemProps {
  file: UploadFile
  index: number
  handleChange: Function
}

export const UploadTableItem: React.FC<UploadTableItemProps> = ({ file, index, handleChange }) => {
  return (
    <TableRow
      sx={{
        "&>td": {
          borderWidth: 0,
          color: "text.primary",
          "& p": {
            color: "text.primary",
            p: "0.25rem",
          },
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
          checked={file.checked}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(index, "checked", evt.currentTarget.checked)
          }
        />
      </TableCell>
      <TableCell>
        <Tooltip title={file.pdf.name} disableInteractive>
          <Box>
            <Typography.Action
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {file.pdf.name}
            </Typography.Action>
          </Box>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={file.propertyName}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "propertyName", evt.currentTarget.value)
            }
            sx={{
              mr: !index ? "0.25rem" : 0,
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
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
                  bgcolor: "primary.contrastText",
                  "& fieldset": {
                    borderColor: "primary.contrastText",
                  },
                },
              },
            }}
          />
          {!index && (
            <IconButton
              sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
              onClick={() => handleChange(-1, "propertyName", file.propertyName)}
            >
              <BulkCopyIcon size={30} />
            </IconButton>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={file.projectName}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "projectName", evt.currentTarget.value)
            }
            sx={{
              mr: !index ? "0.25rem" : 0,
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
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
                  bgcolor: "primary.contrastText",
                  "& fieldset": {
                    borderColor: "primary.contrastText",
                  },
                },
              },
            }}
          />
          {!index && (
            <IconButton
              sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
              onClick={() => handleChange(-1, "projectName", file.projectName)}
            >
              <BulkCopyIcon size={30} />
            </IconButton>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={file.companyName}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "companyName", evt.currentTarget.value)
            }
            sx={{
              mr: !index ? "0.25rem" : 0,
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
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
                  bgcolor: "primary.contrastText",
                  "& fieldset": {
                    borderColor: "primary.contrastText",
                  },
                },
              },
            }}
          />
          {!index && (
            <IconButton
              sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
              onClick={() => handleChange(-1, "companyName", file.companyName)}
            >
              <BulkCopyIcon size={30} />
            </IconButton>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={file.description}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "description", evt.currentTarget.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
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
                  bgcolor: "primary.contrastText",
                  "& fieldset": {
                    borderColor: "primary.contrastText",
                  },
                },
              },
            }}
          />
          {!index && (
            <IconButton
              sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
              onClick={() => handleChange(-1, "companyName", file.companyName)}
            >
              <BulkCopyIcon size={30} />
            </IconButton>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value={file.assignedPerson}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(index, "assignedPerson", evt.currentTarget.value)
            }
            sx={{
              mr: !index ? "0.25rem" : 0,
              "& .MuiOutlinedInput-root": {
                bgcolor: "transparent",
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
                  bgcolor: "primary.contrastText",
                  "& fieldset": {
                    borderColor: "primary.contrastText",
                  },
                },
              },
            }}
          />
          {!index && (
            <IconButton
              sx={{ p: "0.25rem", "&:hover": { bgcolor: "transparent" } }}
              onClick={() => handleChange(-1, "assignedPerson", file.assignedPerson)}
            >
              <BulkCopyIcon size={30} />
            </IconButton>
          )}
        </Box>
      </TableCell>
    </TableRow>
  )
}
