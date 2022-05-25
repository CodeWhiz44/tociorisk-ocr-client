export const createDocumentMetadataSearchParams = (
  pageNum: number,
  countPerPage: number,
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
  let result = `?isArchived=${isArchived}&perPage=${countPerPage}&pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  if (createdAtFrom) {
    result += `&${isArchived ? "archivedAtFrom" : "createdAtFrom"}=${createdAtFrom}`
  }
  if (createdAtTo) {
    result += `&${isArchived ? "archivedAtTo" : "createdAtTo"}=${createdAtTo}`
  }
  if (assignedTo) {
    result += `&assignedTo=${assignedTo}`
  }
  if (projectName) {
    result += `&projectName=${projectName}`
  }
  if (propertyName) {
    result += `&propertyName=${propertyName}`
  }
  if (companyName) {
    result += `&companyName=${companyName}`
  }
  if (createdBy) {
    result += `&createdBy=${createdBy}`
  }
  return result
}
