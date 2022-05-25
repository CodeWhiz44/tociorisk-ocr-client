import React, { useEffect } from "react"
import { Box, Typography, TextField, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosResponse, AxiosError } from "axios"
import * as Yup from "yup"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { isLoginRefreshState } from "src/states/provider"
import { useLogin } from "src/queries/login"
import { ILoginFormInputs, ILoginResponse } from "src/types/login"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  email: Validator.emailSchema(),
  password: Validator.passwordSchema(),
})

export const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const jwtToken = useJWTToken()
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)
  const setIsLoginRefresh = useSetRecoilState(isLoginRefreshState)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate: login, isLoading: isSending } = useLogin({
    onSuccess: (res: AxiosResponse<ILoginResponse>) => {
      if (res.data.initialLogin) {
        navigate("/initial")
      } else {
        jwtToken?.setValue(res.data.idToken)
        setIsLoginRefresh(true)
      }
    },
    onError: (err: AxiosError) => {
      console.error(err.message)
    },
  })

  const onSubmit = (data: ILoginFormInputs) => {
    login({ data })
  }

  useEffect(() => {
    setSelectedSidebarItem("sidebar.login")
    setSelectedSidebarSubItem("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (jwtToken?.value) {
      navigate("/")
    }
  }, [jwtToken?.value, navigate])

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: "2rem",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            maxWidth: "1050px",
            width: "100%",
            bgcolor: "background.default",
            borderRadius: "0.25rem",
            p: "2.625rem",
          }}
        >
          <Typography.Heading sx={{ color: "primary.main", textAlign: "center", mb: "1.5rem" }}>
            {t("sidebar.login")}
          </Typography.Heading>
          <Box sx={{ maxWidth: "600px", width: "100%", mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: "1.5rem",
              }}
            >
              <Typography.Detail
                sx={{
                  flexShrink: 0,
                  width: "120px",
                  fontWeight: 700,
                  color: "secondary.main",
                  letterSpacing: "2px",
                  mr: "0.625rem",
                }}
              >
                {t("common.email")}
              </Typography.Detail>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!errors.email}
                    helperText={errors.email ? t(`error.${errors.email.message}`) : undefined}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: "1.5rem",
              }}
            >
              <Typography.Detail
                sx={{
                  flexShrink: 0,
                  width: "120px",
                  fontWeight: 700,
                  color: "secondary.main",
                  letterSpacing: "2px",
                  mr: "0.625rem",
                }}
              >
                {t("login.password")}
              </Typography.Detail>
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    type="password"
                    placeholder={t("common.password_condition")}
                    value={value}
                    onChange={onChange}
                    error={!!errors.password}
                    helperText={errors.password ? t(`error.${errors.password.message}`) : undefined}
                  />
                )}
              />
            </Box>
            <Button fullWidth role="submit" sx={{ mb: "1rem" }} type="submit" disabled={isSending}>
              {t("sidebar.login")}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "2.5rem" }}>
              <Button
                role="link"
                sx={{ letterSpacing: "2px", fontWeight: 400 }}
                onClick={() => navigate("/password-reset")}
              >
                {t("login.forgot_password")}
              </Button>
            </Box>
          </Box>
          <Typography.Detail
            sx={{
              letterSpacing: "2px",
              color: "secondary.main",
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            {t("login.login_help")}
          </Typography.Detail>
        </Box>
      </form>
    </Box>
  )
}
