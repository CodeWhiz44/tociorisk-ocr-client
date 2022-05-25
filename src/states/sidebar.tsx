import { atom } from "recoil"

export const selectedSidebarItemState = atom<string>({
  key: "selectedSidebarItem",
  default: "",
})

export const selectedSidebarSubItemState = atom<string>({
  key: "selectedSidebarSubItem",
  default: "",
})

export const invitationDialogOpenState = atom<boolean>({
  key: "invitationDialogOpen",
  default: false,
})
