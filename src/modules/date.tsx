import { format } from "date-fns"

export const getRegisteredDate = (date: string) => {
  return format(new Date(date), "yyyy/MM/dd HH:mm")
}
