import React, { useEffect } from "react"
import { Box, Typography, TextField, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useSetRecoilState } from "recoil"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import * as Yup from "yup"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import { useResetPassword } from "src/queries/login"
import { IResetPasswordFormInputs } from "src/types/login"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  password: Validator.passwordSchema(),
  confirmPassword: Validator.confirmPasswordSchema(),
})

export const ChangePassword: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const confirmationCode = searchParams.get("confirmationCode") || ""
  const jwtToken = useJWTToken()
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IResetPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate: resetPassword, isLoading: isResetting } = useResetPassword({
    onSuccess: () => {
      navigate("/login")
    },
    onError: (err: AxiosError) => {
      console.error(err.message)
    },
  })

  const onSubmit = (data: IResetPasswordFormInputs) => {
    resetPassword({
      data: {
        confirmationCode,
        newPassword: data.password,
      },
    })
  }

  useEffect(() => {
    setSelectedSidebarItem("login.password_change")
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
      <Box
        sx={{
          maxWidth: "1050px",
          minHeight: "320px",
          width: "100%",
          bgcolor: "background.default",
          borderRadius: "0.25rem",
          p: "2.625rem",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography.Heading sx={{ color: "primary.main", textAlign: "center", mb: "1.5rem" }}>
            {t("login.password_reset")}
          </Typography.Heading>
          <Typography.Detail
            sx={{
              letterSpacing: "2px",
              color: "text.primary",
              textAlign: "center",
              fontWeight: 400,
              mb: "1.5rem",
            }}
          >
            {t("login.set_new_password")}
          </Typography.Detail>
          <Box
            sx={{
              maxWidth: "600px",
              width: "100%",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mb: "1.5rem",
              }}
            >
              <Typography.Detail
                sx={{
                  flexShrink: 0,
                  width: "200px",
                  fontWeight: 700,
                  color: "secondary.main",
                  letterSpacing: "2px",
                  mr: "0.625rem",
                  textAlign: "right",
                }}
              >
                {t("login.new_password")}
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                mb: "1.5rem",
              }}
            >
              <Typography.Detail
                sx={{
                  flexShrink: 0,
                  width: "200px",
                  fontWeight: 700,
                  color: "secondary.main",
                  letterSpacing: "2px",
                  mr: "0.625rem",
                  textAlign: "right",
                }}
              >
                {t("login.new_password_confirm")}
              </Typography.Detail>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    type="password"
                    placeholder={t("common.confirm_password_condition")}
                    value={value}
                    onChange={onChange}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? t(`error.${errors.confirmPassword.message}`)
                        : undefined
                    }
                  />
                )}
              />
            </Box>
            <Button role="submit" disabled={isResetting}>
              {t("login.reconfigure")}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
