import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  ExpandLessIcon,
  ExpandMoreIcon,
  Collapse,
  TextField,
  Grid,
  LocalizationProvider,
  AdapterDateFns,
  DatePicker,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { parse, format } from "date-fns"

interface SearchBoxProps {
  setIsUploadModalOpen: Function
  queryCreatedAtFrom: string
  queryCreatedAtTo: string
  queryAssignedTo: string
  queryProjectName: string
  queryPropertyName: string
  queryCompanyName: string
  queryCreatedBy: string
  handleFilter: Function
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  setIsUploadModalOpen,
  queryCreatedAtFrom,
  queryCreatedAtTo,
  queryAssignedTo,
  queryProjectName,
  queryPropertyName,
  queryCompanyName,
  queryCreatedBy,
  handleFilter,
}) => {
  const { t } = useTranslation()
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<string | null>(
    queryCreatedAtFrom ? parse(queryCreatedAtFrom, "yyyy-MM-dd", new Date()).toISOString() : null
  )
  const [endDate, setEndDate] = useState<string | null>(
    queryCreatedAtTo ? parse(queryCreatedAtTo, "yyyy-MM-dd", new Date()).toISOString() : null
  )
  const [assignedTo, setAssignedTo] = useState<string>(queryAssignedTo)
  const [projectName, setProjectName] = useState<string>(queryProjectName)
  const [propertyName, setPropertyName] = useState<string>(queryPropertyName)
  const [companyName, setCompanyName] = useState<string>(queryCompanyName)

  const handleChipClick = (fieldName: string) => {
    handleFilter(
      fieldName === "createdAt" ? "" : queryCreatedAtFrom,
      fieldName === "createdAt" ? "" : queryCreatedAtTo,
      fieldName === "assignedTo" ? "" : queryAssignedTo,
      fieldName === "projectName" ? "" : queryProjectName,
      fieldName === "propertyName" ? "" : queryPropertyName,
      fieldName === "companyName" ? "" : queryCompanyName,
      queryCreatedBy
    )
  }

  useEffect(() => {
    if (searchBoxOpen) {
      setStartDate(
        queryCreatedAtFrom
          ? parse(queryCreatedAtFrom, "yyyy-MM-dd", new Date()).toISOString()
          : null
      )
      setEndDate(
        queryCreatedAtTo ? parse(queryCreatedAtTo, "yyyy-MM-dd", new Date()).toISOString() : null
      )
      setAssignedTo(queryAssignedTo)
      setProjectName(queryProjectName)
      setPropertyName(queryPropertyName)
      setCompanyName(queryCompanyName)
    }
  }, [
    searchBoxOpen,
    queryCreatedAtFrom,
    queryCreatedAtTo,
    queryAssignedTo,
    queryProjectName,
    queryPropertyName,
    queryCompanyName,
  ])

  return (
    <Box sx={{ flexShrink: 1, mb: "0.75rem" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "flex-start" }}>
          <Select
            value={queryCreatedBy}
            sx={{
              minWidth: "120px",
              mr: "0.5rem",
            }}
            onChange={(e: SelectChangeEvent<unknown>) =>
              handleFilter(
                queryCreatedAtFrom,
                queryCreatedAtTo,
                queryAssignedTo,
                queryProjectName,
                queryPropertyName,
                queryCompanyName,
                e.target.value as string
              )
            }
          >
            <MenuItem value="all">{t("file.all")}</MenuItem>
            <MenuItem value="me">{t("file.me")}</MenuItem>
          </Select>
          <Button
            role="submit"
            onClick={() => setSearchBoxOpen(!searchBoxOpen)}
            sx={{
              mr: "0.5rem",
              pb: searchBoxOpen ? "0.75rem" : "0.375rem",
              borderRadius: searchBoxOpen ? "0.25rem 0.25rem 0 0 " : "0.25rem",
            }}
          >
            <Typography.Detail
              sx={{ lineHeight: "1.25rem", letterSpacing: "2px", fontWeight: 600, mr: "1rem" }}
            >
              {t("file.set_refinement_criteria")}
            </Typography.Detail>
            {searchBoxOpen ? (
              <ExpandLessIcon sx={{ width: "8px", height: "8px" }} />
            ) : (
              <ExpandMoreIcon sx={{ width: "8px", height: "8px" }} />
            )}
          </Button>
          {!!queryAssignedTo && (
            <Button
              role="action"
              sx={{ mr: "0.5rem" }}
              onClick={() => handleChipClick("assignedTo")}
            >{`${t("file.person_in_charge")}: ${queryAssignedTo}`}</Button>
          )}
          {(!!queryCreatedAtFrom || !!queryCreatedAtTo) && (
            <Button role="action" onClick={() => handleChipClick("createdAt")}>{`${t(
              "file.registration_date"
            )}：${queryCreatedAtFrom} - ${queryCreatedAtTo}`}</Button>
          )}
          {!!queryProjectName && (
            <Button
              role="action"
              sx={{ mr: "0.5rem" }}
              onClick={() => handleChipClick("projectName")}
            >{`${t("file.project_name")}: ${queryProjectName}`}</Button>
          )}
          {!!queryPropertyName && (
            <Button
              role="action"
              sx={{ mr: "0.5rem" }}
              onClick={() => handleChipClick("propertyName")}
            >{`${t("file.property_name")}: ${queryPropertyName}`}</Button>
          )}
          {!!queryCompanyName && (
            <Button
              role="action"
              sx={{ mr: "0.5rem" }}
              onClick={() => handleChipClick("companyName")}
            >{`${t("file.company_name")}: ${queryCompanyName}`}</Button>
          )}
        </Box>
        <Button
          sx={{
            flexShrink: 0,
            borderColor: "primary.main",
            fontSize: "0.75rem",
            fontWeight: 600,
            lineHeight: "1.25rem",
            color: "primary.main",
            py: "0.25rem",
          }}
          onClick={() => setIsUploadModalOpen(true)}
        >
          {t("file.upload")}
        </Button>
      </Box>
      <Collapse in={searchBoxOpen}>
        <Box
          sx={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "text.disabled",
            p: "1.75rem 2.5rem 1.125rem",
            mb: "2rem",
          }}
        >
          <Grid
            container
            columnSpacing={5}
            rowSpacing={3}
            sx={{ mb: "2rem", "& p": { fontWeight: 700, color: "secondary.main" } }}
          >
            <Grid item xs={12} lg={4}>
              <Typography.Action>{t("file.registration_date")}</Typography.Action>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={startDate}
                    onChange={(value) => setStartDate(value)}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ mr: "0.5rem" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Action sx={{ flexShrink: 0, color: "secondary.main", mr: "0.5rem" }}>
                  {t("file.from")}
                </Typography.Action>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={endDate}
                    onChange={(value) => setEndDate(value)}
                    inputFormat="yyyy/MM/dd"
                    renderInput={(params) => (
                      <TextField fullWidth sx={{ mr: "0.5rem" }} {...params} />
                    )}
                  />
                </LocalizationProvider>
                <Typography.Action sx={{ flexShrink: 0, color: "secondary.main" }}>
                  {t("file.between")}
                </Typography.Action>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography.Action>{t("file.person_in_charge")}</Typography.Action>
              <TextField
                fullWidth
                value={assignedTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssignedTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography.Action>{t("file.project_name")}</Typography.Action>
              <TextField
                fullWidth
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectName(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography.Action>{t("file.property_name")}</Typography.Action>
              <TextField
                fullWidth
                value={propertyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPropertyName(e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography.Action>{t("file.company_name")}</Typography.Action>
              <TextField
                fullWidth
                value={companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompanyName(e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              role="submit"
              sx={{ letterSpacing: 0, minWidth: "200px", p: "0.5rem" }}
              onClick={() => {
                handleFilter(
                  startDate ? format(new Date(startDate), "yyyy-MM-dd") : "",
                  endDate ? format(new Date(endDate), "yyyy-MM-dd") : "",
                  assignedTo,
                  projectName,
                  propertyName,
                  companyName,
                  queryCreatedBy
                )
                setSearchBoxOpen(false)
              }}
            >
              {t("file.search")}
            </Button>
            <Button
              role="link"
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                letterSpacing: 0,
                transform: "translateY(-50%)",
                color: "secondary.main",
              }}
              onClick={() => {
                setStartDate(null)
                setEndDate(null)
                setAssignedTo("")
                setProjectName("")
                setPropertyName("")
                setCompanyName("")
              }}
            >
              {t("file.reset_conditions")}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}
