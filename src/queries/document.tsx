import { useQuery } from "@tanstack/react-query"
import { AxiosResponse, AxiosError } from "axios"

import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import { UploadFile, DocumentsResponse, UpdateDocument } from "src/types/file"
import { createDocumentMetadataSearchParams } from "src/modules/query"

const upload = async ({
  data,
  setProgress,
  accessToken,
  setUploadedCount,
}: {
  data: UploadFile[]
  setProgress: Function
  accessToken: string
  setUploadedCount: Function
}) => {
  setUploadedCount(0)
  const results = []
  for (let i = 0; i < data.length; i++) {
    const formData = new FormData()
    formData.append("pdf", data[i].pdf)
    formData.append("companyName", data[i].companyName)
    formData.append("propertyName", data[i].propertyName)
    formData.append("projectName", data[i].projectName)
    formData.append("assignedPerson", data[i].assignedPerson)
    formData.append("description", data[i].description)
    const result = await getApiClient({
      "content-type": "multipart/form-data",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    }).post("/documents", formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
      },
    })
    results.push(result)
    setUploadedCount(i + 1)
    setProgress(0)
  }
  return results
}

export const useUpload = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(upload, onSuccess, onError)
}

const readDocumentsMetadata = (
  pageNum: number,
  countPerPage: number,
  accessToken: string,
  isArchived: boolean,
  sortBy: string,
  sortOrder: string,
  createdAtFrom?: string,
  createdAtTo?: string,
  assignedTo?: string,
  projectName?: string,
  propertyName?: string,
  companyName?: string,
  createdBy?: string
) => {
  return getApiClient({
    "content-type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  }).get(
    `documents/metadata${createDocumentMetadataSearchParams(
      pageNum,
      countPerPage,
      isArchived,
      sortBy,
      sortOrder,
      createdAtFrom,
      createdAtTo,
      assignedTo,
      projectName,
      propertyName,
      companyName,
      createdBy
    )}`
  )
}

export const useReadDocumentsMetadata = (
  pageNum: number,
  countPerPage: number,
  accessToken: string,
  isArchived: boolean,
  sortBy: string,
  sortOrder: string,
  createdAtFrom?: string,
  createdAtTo?: string,
  assignedTo?: string,
  projectName?: string,
  propertyName?: string,
  companyName?: string,
  createdBy?: string
) => {
  return useQuery<AxiosResponse<DocumentsResponse>, AxiosError>(
    [
      "readDocumentsMetadata",
      pageNum,
      countPerPage,
      accessToken,
      isArchived,
      sortBy,
      sortOrder,
      createdAtFrom,
      createdAtTo,
      assignedTo,
      projectName,
      propertyName,
      companyName,
      createdBy,
    ],
    () =>
      readDocumentsMetadata(
        pageNum,
        countPerPage,
        accessToken,
        isArchived,
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
  )
}

const downloadFiles = ({
  data,
  accessToken,
  fileType,
}: {
  data: number[]
  accessToken: string
  fileType: string
}) => {
  const promises = data.map((id) =>
    getApiClient({
      "content-type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    }).get(`/documents?documentId=${id}&fileType=${fileType}`, { responseType: "blob" })
  )
  return Promise.all(promises)
}

export const useDownloadFiles = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(downloadFiles, onSuccess, onError)
}

const archiveDocuments = ({ data, accessToken }: { data: number[]; accessToken: string }) => {
  return getApiClient({
    "content-type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  }).delete(`/documents?documentIds=${data.join()}`)
}

export const useArchiveDocuments = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(archiveDocuments, onSuccess, onError)
}

const unArchiveDocuments = ({ data, accessToken }: { data: number[]; accessToken: string }) => {
  return getApiClient({
    "content-type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  }).put(`/documents/trash?documentIds=${data.join()}`)
}

export const useUnArchiveDocuments = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(unArchiveDocuments, onSuccess, onError)
}

const updateDocumentsMetadata = ({
  data,
  accessToken,
}: {
  data: UpdateDocument[]
  accessToken: string
}) => {
  return getApiClient({
    "content-type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  }).put("/documents/metadata", { documents: data })
}

export const useUpdateDocumentsMetadata = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateDocumentsMetadata, onSuccess, onError)
}
