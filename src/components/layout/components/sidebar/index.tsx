import React, { useState } from "react"
import {
  Box,
  Button,
  Typography,
  HomeOutlinedIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { LoginSection } from "./components/loginSection"
import { UserInvitationDialog } from "./components/userInvitationDialog"
import { CompleteDialog } from "src/components/completeDialog"

const OPEN_WIDTH = 280
const COLLAPSE_WIDTH = 60

export const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState<boolean>(
    localStorage.getItem("sidebar_collapsed") === "false" ? false : true
  )
  const [completeDialogOpen, setCompleteDialogOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleClick = () => {
    setOpen(!open)
    localStorage.setItem("sidebar_collapsed", open ? "false" : "true")
  }

  const onClickLogo = () => {
    navigate("/")
  }
  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        width: `${open ? OPEN_WIDTH : COLLAPSE_WIDTH}px`,
        transition: "all 0.3s ease-in-out",
        boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100px",
          bgcolor: "primary.main",
          mb: "0.5rem",
          cursor: "pointer",
        }}
        onClick={onClickLogo}
      >
        {open ? (
          <Typography.Title sx={{ color: "primary.light" }}>よみとりくんＳ</Typography.Title>
        ) : (
          <HomeOutlinedIcon sx={{ color: "background.default", width: "24px", height: "24px" }} />
        )}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "flex-end",
          px: "0.75rem",
          mb: "1.5rem",
        }}
      >
        <Button role="link" onClick={handleClick} sx={{ height: "14px", alignItems: "center" }}>
          {open && (
            <Typography.Action
              sx={{
                lineSpacing: "0.875rem",
                fontWeight: 600,
                letterSpacing: "5px",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {t("sidebar.close_menu")}
            </Typography.Action>
          )}
          {open ? (
            <ChevronLeftIcon sx={{ width: "14px", height: "14px" }} />
          ) : (
            <ChevronRightIcon sx={{ width: "14px", height: "14px" }} />
          )}
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
        <LoginSection open={open} />
      </Box>
      <UserInvitationDialog setCompleteOpen={setCompleteDialogOpen} />
      <CompleteDialog
        open={completeDialogOpen}
        setOpen={setCompleteDialogOpen}
        description={t("user_invitation.invitation_complete")}
      />
    </Box>
  )
}
