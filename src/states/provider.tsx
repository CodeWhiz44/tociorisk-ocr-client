import { atom } from "recoil"

export const isLoginRefreshState = atom<boolean>({
  key: "isLoginRefresh",
  default: false,
})
