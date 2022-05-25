import React, { useMemo } from "react"
import { Box, Button, IconButton, LoginIcon, LogoutIcon } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

import { Item } from "./item"

import { links } from "src/constants/sidebar"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import { useLogout } from "src/queries/login"

interface LoginSectionProps {
  open: boolean
}

export const LoginSection: React.FC<LoginSectionProps> = ({ open }) => {
  const { t } = useTranslation()
  const jwtToken = useJWTToken()
  const navigate = useNavigate()

  const isLogin = useMemo(() => !!jwtToken?.value, [jwtToken])

  const { mutate: logout, isLoading: isSending } = useLogout({
    onSuccess: () => {
      jwtToken?.setValue("")
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const handleLoginOrLogout = () => {
    if (isLogin) {
      logout({})
    } else {
      navigate("/login")
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "overlay" }}>
        {isLogin && links.map((link) => <Item key={link.key} item={link} open={open} />)}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: open ? "1.25rem" : 0,
          height: "80px",
        }}
      >
        {open ? (
          <Button fullWidth onClick={handleLoginOrLogout} disabled={isSending}>
            {isLogin ? t("sidebar.logout") : t("sidebar.login")}
          </Button>
        ) : (
          <IconButton
            sx={{ color: "secondary.main", "&:hover": { color: "primary.main" } }}
            onClick={handleLoginOrLogout}
            disabled={isSending}
          >
            {isLogin ? <LogoutIcon /> : <LoginIcon sx={{ transform: "rotate(180deg)" }} />}
          </IconButton>
        )}
      </Box>
    </Box>
  )
}
