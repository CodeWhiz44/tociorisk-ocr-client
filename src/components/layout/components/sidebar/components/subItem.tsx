import React from "react"
import { ListItemButton, Typography } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { SidebarSubItem } from "src/types/sidebar"
import { selectedSidebarSubItemState, invitationDialogOpenState } from "src/states/sidebar"

interface SubItemProps {
  subItem: SidebarSubItem
  open: boolean
}

export const SubItem: React.FC<SubItemProps> = ({ subItem, open }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const selectedSidebarSubItem = useRecoilValue(selectedSidebarSubItemState)
  const setInvitationDialogOpen = useSetRecoilState(invitationDialogOpenState)

  return (
    <ListItemButton
      sx={{
        height: "40px",
        px: open ? "3.5rem" : "1.5rem",
        "&:hover": { bgcolor: "primary.light" },
      }}
      onClick={() => {
        subItem.key === "sidebar.user_invitation"
          ? setInvitationDialogOpen(true)
          : navigate(subItem.link)
      }}
    >
      <Typography.Detail
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          letterSpacing: "5px",
          color: selectedSidebarSubItem === subItem.key ? "primary.main" : "secondary.main",
        }}
      >
        {t(subItem.key)}
      </Typography.Detail>
    </ListItemButton>
  )
}
