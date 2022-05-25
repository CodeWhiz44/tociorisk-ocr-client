import { UploadFile } from "src/types/file"

export const checkUploadFiles = (files: UploadFile[]): boolean => {
  if (!files.length) {
    return false
  }
  files.forEach((file) => {
    if (!file.companyName || !file.projectName || !file.propertyName || !file.assignedPerson) {
      return false
    }
  })
  return true
}
