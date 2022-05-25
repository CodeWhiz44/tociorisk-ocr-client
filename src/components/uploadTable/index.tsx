import React, { useMemo } from "react"
import { Box, TableContainer, Table, TableBody } from "src/UILibrary"

import { UploadTableHeader } from "./components/uploadTableHeader"
import { UploadTableItem } from "./components/uploadTableItem"

import { UploadFile } from "src/types/file"

interface UploadTableProps {
  files: UploadFile[]
  handleChange: Function
  handleAllCheckChange: Function
}

export const UploadTable: React.FC<UploadTableProps> = ({
  files,
  handleChange,
  handleAllCheckChange,
}) => {
  const allChecked = useMemo(() => files.every((file) => file.checked), [files])

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
      }}
    >
      <Box sx={{ ml: "-1.5rem" }}>
        <TableContainer sx={{ borderWidth: 0, minWidth: "960px" }}>
          <Table size="small" sx={{ tableLayout: "fixed" }}>
            <UploadTableHeader checked={allChecked} handleAllCheckChange={handleAllCheckChange} />
            <TableBody>
              {files.map((file, index) => (
                <UploadTableItem
                  key={index}
                  file={file}
                  index={index}
                  handleChange={handleChange}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
