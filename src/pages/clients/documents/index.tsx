import React, { useEffect, useState, useMemo } from "react"
import { Box, Typography, Pagination, Skeleton } from "src/UILibrary"
import { useSetRecoilState } from "recoil"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AxiosResponse, AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"
import fileDownload from "js-file-download"

import { PageTitle } from "src/components/pageTitle"
import { SearchBox } from "./components/searchBox"
import { GroupActions } from "./components/groupActions"
import { DocumentTable } from "src/components/documentTable"
import { UploadFiles } from "./components/uploadFiles"
import { UploadProgressDialog } from "./components/uploadProgressDialog"
import { CompleteDialog } from "src/components/completeDialog"
import { WorkingDialog } from "src/components/workingDialog"
import { ConfirmDialog } from "src/components/confirmDialog"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import { UploadFile, DocumentItem } from "src/types/file"
import {
  useUpload,
  useReadDocumentsMetadata,
  useDownloadFiles,
  useUpdateDocumentsMetadata,
  useArchiveDocuments,
} from "src/queries/document"
import { checkUploadFiles } from "src/modules/uploadHelper"

interface ISearchParams {
  sortBy: string
  sortOrder: string
  createdAtFrom: string
  createdAtTo: string
  assignedTo: string
  projectName: string
  propertyName: string
  companyName: string
  createdBy: string
}

const COUNT_PER_PAGE = 15

export const Documents: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const jwtToken = useJWTToken()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") || (sortBy === "createdAt" ? "desc" : "asc")
  const queryCreatedAtFrom = searchParams.get("createdAtFrom") || ""
  const queryCreatedAtTo = searchParams.get("createdAtTo") || ""
  const queryAssignedTo = searchParams.get("assignedTo") || ""
  const queryProjectName = searchParams.get("projectName") || ""
  const queryPropertyName = searchParams.get("propertyName") || ""
  const queryCompanyName = searchParams.get("companyName") || ""
  const queryCreatedBy = searchParams.get("createdBy") || "all"
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState<boolean>(false)
  const [completeDialogDescription, setCompleteDialogDescription] = useState<string>("")
  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploadedCount, setUploadedCount] = useState<number>(0)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [editingDocuments, setEditingDocuments] = useState<DocumentItem[]>([])
  const [maxPageCount, setMaxPageCount] = useState<number>(0)
  const [workingDialogDescription, setWorkingDialogDescription] = useState<string>("")
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)

  const groupActionDisabled = useMemo(
    () => documents.every((document) => !document.checked),
    [documents]
  )

  const { data, isLoading, error } = useReadDocumentsMetadata(
    page,
    COUNT_PER_PAGE,
    jwtToken?.value || "",
    false,
    sortBy,
    sortOrder,
    queryCreatedAtFrom,
    queryCreatedAtTo,
    queryAssignedTo,
    queryProjectName,
    queryPropertyName,
    queryCompanyName,
    queryCreatedBy
  )

  const { mutate: upload, isLoading: isUploading } = useUpload({
    onSuccess: () => {
      setFiles([])
      setCompleteDialogDescription(t("file.upload_complete"))
      setIsCompleteDialogOpen(true)
      queryClient.invalidateQueries(["readDocumentsMetadata"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const { mutate: downloadExcelFiles, isLoading: isDownloadingExcel } = useDownloadFiles({
    onSuccess: (res: AxiosResponse<Blob>[]) => {
      res.forEach((data, index) => {
        fileDownload(data.data, `File-${index}.xlsx`)
      })
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const { mutate: downloadPDFFiles, isLoading: isDownloadingPDF } = useDownloadFiles({
    onSuccess: (res: AxiosResponse<Blob>[]) => {
      res.forEach((data, index) => {
        fileDownload(data.data, `File-${index}.pdf`)
      })
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const { mutate: updateDocumentsMetadata, isLoading: isUpdating } = useUpdateDocumentsMetadata({
    onSuccess: () => {
      setCompleteDialogDescription(t("file.update_complete"))
      setIsCompleteDialogOpen(true)
      queryClient.invalidateQueries(["readDocumentsMetadata"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const { mutate: archiveDocuments, isLoading: isArchiving } = useArchiveDocuments({
    onSuccess: () => {
      queryClient.invalidateQueries(["readDocumentsMetadata"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const onStartUpload = () => {
    if (checkUploadFiles(files)) {
      setIsUploadModalOpen(false)
      upload({
        data: files,
        setProgress: setUploadProgress,
        accessToken: jwtToken?.value || "",
        setUploadedCount: setUploadedCount,
      })
    }
  }

  const onStartDownloadFiles = (fileType: string) => {
    if (!groupActionDisabled) {
      const ids = documents.filter((document) => document.checked).map((document) => document.id)
      setWorkingDialogDescription(t("file.downloading"))
      if (fileType === "xls") {
        downloadExcelFiles({ data: ids, accessToken: jwtToken?.value || "", fileType: fileType })
      } else {
        downloadPDFFiles({ data: ids, accessToken: jwtToken?.value || "", fileType: fileType })
      }
    }
  }

  const onUpdateDocuments = () => {
    if (
      !groupActionDisabled &&
      editingDocuments.every(
        (document) =>
          !!document.companyName &&
          !!document.projectName &&
          !!document.propertyName &&
          !!document.description &&
          !!document.assignedTo
      )
    ) {
      setWorkingDialogDescription(t("file.editing"))
      updateDocumentsMetadata({
        data: editingDocuments.map((document) => ({
          id: document.id,
          propertyName: document.propertyName,
          projectName: document.projectName,
          companyName: document.companyName,
          description: document.description,
          assignedTo: document.assignedTo,
        })),
        accessToken: jwtToken?.value || "",
      })
    }
  }

  const onArchiveDocuments = () => {
    if (!groupActionDisabled) {
      setWorkingDialogDescription(t("file.deleting"))
      setConfirmDialogOpen(false)
      const ids = documents.filter((document) => document.checked).map((document) => document.id)
      archiveDocuments({
        data: ids,
        accessToken: jwtToken?.value || "",
      })
    }
  }

  const handleSearchParams = (
    sortBy: string,
    sortOrder: string,
    createdAtFrom: string,
    createdAtTo: string,
    assignedTo: string,
    projectName: string,
    propertyName: string,
    companyName: string,
    createdBy: string
  ) => {
    const newSearchParam: Partial<ISearchParams> = {}
    newSearchParam.sortBy = sortBy
    newSearchParam.sortOrder = sortOrder
    if (createdAtFrom) {
      newSearchParam.createdAtFrom = createdAtFrom
    }
    if (createdAtTo) {
      newSearchParam.createdAtTo = createdAtTo
    }
    if (assignedTo) {
      newSearchParam.assignedTo = assignedTo
    }
    if (projectName) {
      newSearchParam.projectName = projectName
    }
    if (propertyName) {
      newSearchParam.propertyName = propertyName
    }
    if (companyName) {
      newSearchParam.companyName = companyName
    }
    if (createdBy) {
      newSearchParam.createdBy = createdBy
    }
    setSearchParams(newSearchParam, { replace: true })
  }

  const handleSort = (fieldName: string) => {
    const newSortOrder =
      fieldName === sortBy
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : fieldName === "createdAt"
        ? "desc"
        : "asc"
    handleSearchParams(
      fieldName,
      newSortOrder,
      queryCreatedAtFrom,
      queryCreatedAtTo,
      queryAssignedTo,
      queryProjectName,
      queryPropertyName,
      queryCompanyName,
      queryCreatedBy
    )
  }

  const handleFilter = (
    createdAtFrom: string,
    createdAtTo: string,
    assignedTo: string,
    projectName: string,
    propertyName: string,
    companyName: string,
    createdBy: string
  ) => {
    handleSearchParams(
      sortBy,
      sortOrder,
      createdAtFrom,
      createdAtTo,
      assignedTo,
      projectName,
      propertyName,
      companyName,
      createdBy
    )
  }

  useEffect(() => {
    setSelectedSidebarItem("sidebar.file")
    setSelectedSidebarSubItem("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!jwtToken?.value) {
      navigate("/login")
    }
  }, [jwtToken?.value, navigate])

  useEffect(() => {
    data?.data.documentCount
      ? setDocuments(data?.data.documents.map((item) => ({ ...item, checked: false })))
      : setDocuments([])
    !!data && setMaxPageCount(Math.ceil((data.data.documentCount || 0) / COUNT_PER_PAGE))
    !!data && setTotalCount(data.data.documentCount || 0)
    setIsEditable(false)
  }, [data])

  useEffect(() => {
    setEditingDocuments(
      isEditable ? documents.filter((document) => document.checked) : [...documents]
    )
  }, [documents, isEditable])

  return (
    <>
      <PageTitle title={t("sidebar.file")} />
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
          p: "1rem 3rem 1.25rem 2.25rem",
          display: "flex",
          flexDirection: "column",
          maxWidth: "calc(100vw - 280px)",
          mx: "auto",
        }}
      >
        <SearchBox
          setIsUploadModalOpen={setIsUploadModalOpen}
          queryCreatedAtFrom={queryCreatedAtFrom}
          queryCreatedAtTo={queryCreatedAtTo}
          queryAssignedTo={queryAssignedTo}
          queryProjectName={queryProjectName}
          queryPropertyName={queryPropertyName}
          queryCompanyName={queryCompanyName}
          queryCreatedBy={queryCreatedBy}
          handleFilter={handleFilter}
        />
        <Box
          sx={{
            flexShrink: 1,
            display: "flex",
            alignItems: "flex-end",
            mb: "0.5rem",
            pl: "1.5rem",
          }}
        >
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Typography.Detail sx={{ color: "primary.main", fontWeight: 600, mr: "0.625rem" }}>
              {`${!totalCount ? 0 : COUNT_PER_PAGE * (page - 1) + 1}-${
                COUNT_PER_PAGE * (page - 1) + documents.length
              } / ${totalCount}${t("file.piece")}`}
            </Typography.Detail>
            <Typography.Detail sx={{ color: "secondary.main", mr: "0.5rem", flexGrow: 1 }}>
              {`${t("file.display_result")}${documents.length}${t("file.piece")}`}
            </Typography.Detail>
          </Box>
          <GroupActions
            disabled={groupActionDisabled}
            onDownloadFiles={onStartDownloadFiles}
            onUpdateDocuments={onUpdateDocuments}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            onArchiveDocuments={() => setConfirmDialogOpen(true)}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DocumentTable
            documents={editingDocuments}
            setDocuments={setDocuments}
            setEditingDocuments={setEditingDocuments}
            isEditable={isEditable}
            isLoading={isLoading}
            error={error}
            pageNum={page}
            pageCount={COUNT_PER_PAGE}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "0.5rem",
          }}
        >
          {!maxPageCount && isLoading ? (
            <Skeleton sx={{ width: "120px", height: "30px" }} />
          ) : (
            <>
              {!!maxPageCount && (
                <Pagination
                  count={maxPageCount}
                  color="primary"
                  page={page}
                  onChange={(e: React.ChangeEvent<unknown>, value: number) => {
                    setPage(value)
                  }}
                  disabled={isEditable}
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <UploadFiles
        open={isUploadModalOpen}
        setOpen={setIsUploadModalOpen}
        onStart={onStartUpload}
        files={files}
        setFiles={setFiles}
      />
      <UploadProgressDialog
        open={isUploading}
        maxCount={files.length}
        uploadedCount={uploadedCount}
        uploadProgress={uploadProgress}
      />
      <CompleteDialog
        open={isCompleteDialogOpen}
        setOpen={setIsCompleteDialogOpen}
        description={completeDialogDescription}
      />
      <WorkingDialog
        open={isDownloadingPDF || isDownloadingExcel || isUpdating || isArchiving}
        description={workingDialogDescription}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        handleClick={() => onArchiveDocuments()}
        description={t("file.want_delete")}
        actionLabel={t("file.delete")}
      />
    </>
  )
}
