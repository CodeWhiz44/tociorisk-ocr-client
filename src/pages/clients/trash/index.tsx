import React, { useEffect, useState, useMemo } from "react"
import {
  Box,
  Button,
  Typography,
  Pagination,
  Dialog,
  HourglassEmptyIcon,
  Skeleton,
} from "src/UILibrary"
import { useSetRecoilState } from "recoil"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { PageTitle } from "src/components/pageTitle"
import { DocumentTable } from "src/components/documentTable"
import { ConfirmDialog } from "src/components/confirmDialog"
import { CompleteDialog } from "src/components/completeDialog"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import { DocumentItem } from "src/types/file"
import { useReadDocumentsMetadata, useUnArchiveDocuments } from "src/queries/document"
import { subMonths, format } from "date-fns"

const COUNT_PER_PAGE = 15

export const Trash: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const jwtToken = useJWTToken()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get("sortBy") || "createdAt"
  const sortOrder = searchParams.get("sortOrder") || (sortBy === "createdAt" ? "desc" : "asc")
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)
  const [completeDialogOpen, setCompleteDialogOpen] = useState<boolean>(false)
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [page, setPage] = useState<number>(1)
  const [maxPageCount, setMaxPageCount] = useState<number>(0)
  const [totalCount, setTotalCount] = useState<number>(0)

  const groupActionDisabled = useMemo(
    () => documents.every((document) => !document.checked),
    [documents]
  )

  const { data, isLoading, error } = useReadDocumentsMetadata(
    page,
    COUNT_PER_PAGE,
    jwtToken?.value || "",
    true,
    sortBy,
    sortOrder,
    format(subMonths(new Date(), 1), "yyyy-MM-dd")
  )

  const { mutate: unArchiveDocuments, isLoading: isArchiving } = useUnArchiveDocuments({
    onSuccess: () => {
      queryClient.invalidateQueries(["readDocumentsMetadata"])
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const handleUnArchiveDocuments = () => {
    setConfirmDialogOpen(false)
    const ids = documents.filter((document) => document.checked).map((document) => document.id)
    unArchiveDocuments({
      data: ids,
      accessToken: jwtToken?.value || "",
    })
  }

  const handleSort = (fieldName: string) => {
    const newSearchParam: Partial<{ sortBy: string; sortOrder: string }> = {}
    newSearchParam.sortBy = fieldName
    newSearchParam.sortOrder =
      fieldName === sortBy
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : fieldName === "createdAt"
        ? "desc"
        : "asc"
    setSearchParams(newSearchParam, { replace: true })
  }

  useEffect(() => {
    data?.data.documentCount
      ? setDocuments(data?.data.documents.map((item) => ({ ...item, checked: false })))
      : setDocuments([])
    !!data && setMaxPageCount(Math.ceil((data.data.documentCount || 0) / COUNT_PER_PAGE))
    !!data && setTotalCount(data.data.documentCount || 0)
  }, [data])

  useEffect(() => {
    setSelectedSidebarItem("sidebar.trash")
    setSelectedSidebarSubItem("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!jwtToken?.value) {
      navigate("/login")
    }
  }, [jwtToken?.value, navigate])

  return (
    <>
      <PageTitle title={t("sidebar.trash")} />
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
        <Box
          sx={{
            flexShrink: 1,
            display: "flex",
            alignItems: "center",
            mb: "0.5rem",
            pl: "1.5rem",
          }}
        >
          <Typography.Detail sx={{ color: "primary.main", fontWeight: 600, mr: "0.625rem" }}>
            {`${!totalCount ? 0 : COUNT_PER_PAGE * (page - 1) + 1}-${
              COUNT_PER_PAGE * (page - 1) + documents.length
            } / ${totalCount}${t("file.piece")}`}
          </Typography.Detail>
          <Typography.Detail sx={{ color: "secondary.main", mr: "0.5rem", flexGrow: 1 }}>
            {`${t("file.display_result")}${documents.length}${t("file.piece")}`}
          </Typography.Detail>
          <Button
            role="submit"
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              lineHeight: "1.25rem",
              py: "0.25rem",
              letterSpacing: "2px",
            }}
            disabled={groupActionDisabled}
            onClick={() => setConfirmDialogOpen(true)}
          >
            {t("trash.restore")}
          </Button>
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
            documents={documents}
            setDocuments={setDocuments}
            setEditingDocuments={setDocuments}
            isEditable={false}
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
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <ConfirmDialog
        open={confirmDialogOpen}
        setOpen={setConfirmDialogOpen}
        handleClick={() => handleUnArchiveDocuments()}
        description={t("trash.want_restore")}
        actionLabel={t("trash.restore")}
      />
      <CompleteDialog
        open={completeDialogOpen}
        setOpen={setCompleteDialogOpen}
        description={t("trash.restore_complete")}
      />
      <Dialog open={isArchiving}>
        <Box
          sx={{
            width: "500px",
            bgcolor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "2rem",
          }}
        >
          <HourglassEmptyIcon
            sx={{ width: "70px", height: "70px", color: "background.default", mb: "1.5rem" }}
          />
          <Typography.Heading sx={{ letterSpacing: "2px", color: "background.default" }}>
            {t("trash.restoring")}
          </Typography.Heading>
        </Box>
      </Dialog>
    </>
  )
}
