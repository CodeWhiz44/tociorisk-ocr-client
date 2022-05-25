import React, { useEffect } from "react"
import { Box, Typography, TextField, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import * as Yup from "yup"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import { IInitialFormInputs } from "src/types/login"
import { useInitialSetting } from "src/queries/login"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  newPassword: Validator.passwordSchema(),
  confirmPassword: Validator.confirmPasswordSchema("newPassword"),
})

export const InitialSetting: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const jwtToken = useJWTToken()
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IInitialFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const { mutate: initialSetting, isLoading: isSending } = useInitialSetting({
    onSuccess: () => {
      navigate("/login")
    },
    onError: (err: AxiosError) => {
      console.error(err.response)
    },
  })

  const onSubmit = (data: IInitialFormInputs) => {
    const apiData = { newPassword: data.newPassword }
    initialSetting({ data: apiData })
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
            {t("login.initial_password_setting")}
          </Typography.Heading>
          <Box sx={{ maxWidth: "600px", width: "100%", mx: "auto" }}>
            <Typography.Action
              sx={{
                fontWeight: 700,
                lineHeight: "0.75rem",
                mb: "0.25rem",
                color: "secondary.main",
              }}
            >
              {t("login.password")}
            </Typography.Action>
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mb: "1rem" }}
                  placeholder={t("common.password_condition")}
                  value={value}
                  onChange={onChange}
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword ? t(`error.${errors.newPassword.message}`) : undefined
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="password"
                  fullWidth
                  sx={{ mb: "1.5rem" }}
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
            <Button
              fullWidth
              role="submit"
              type="submit"
              sx={{ letterSpacing: 0 }}
              disabled={isSending}
            >
              {t("login.signup")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  )
}
