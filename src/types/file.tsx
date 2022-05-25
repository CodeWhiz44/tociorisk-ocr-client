export interface UploadFile {
  checked: boolean
  pdf: File
  propertyName: string
  projectName: string
  companyName: string
  description: string
  assignedPerson: string
}

export interface DocumentInfo {
  id: number
  createdAt: string
  fileName: string
  propertyName: string
  projectName: string
  companyName: string
  assignedTo: string
  description: string
  pdfFilePath: string
  excelFilePath: string
  isOCRComplete: boolean
  createdBy: string
}

export type DocumentsResponse = {
  documents: DocumentInfo[]
  documentCount: number
}

export type DocumentItem = DocumentInfo & { checked: boolean }

export interface UpdateDocument {
  id: number
  propertyName: string
  projectName: string
  companyName: string
  description: string
  assignedTo: string
}
