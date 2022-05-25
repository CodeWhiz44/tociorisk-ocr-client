import React, { useEffect, useState } from "react"
import { Box, Typography, TextField, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import * as Yup from "yup"

import { CompleteDialog } from "src/components/completeDialog"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"
import { useForgotPassword } from "src/queries/login"
import { IForgotPasswordFormInputs } from "src/types/login"
import { useJWTToken } from "src/modules/jwtTokenProvider"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  email: Validator.emailSchema(),
})

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation()
  const jwtToken = useJWTToken()
  const navigate = useNavigate()
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IForgotPasswordFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  })

  const { mutate: forgotPassword, isLoading: isRequesting } = useForgotPassword({
    onSuccess: () => {
      setIsCompleteDialogOpen(true)
    },
    onError: (err: AxiosError) => {
      console.error(err.message)
    },
  })

  const onSubmit = (data: IForgotPasswordFormInputs) => {
    forgotPassword({ data })
  }

  useEffect(() => {
    setSelectedSidebarItem("login.password_reset")
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
            minHeight: "320px",
            width: "100%",
            bgcolor: "background.default",
            borderRadius: "0.25rem",
            p: "2.625rem",
          }}
        >
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
            {t("login.password_reset_help")}
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
            <Button role="submit" type="submit" sx={{ mb: "2.5rem" }} disabled={isRequesting}>
              {t("login.send")}
            </Button>
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
      <CompleteDialog
        open={isCompleteDialogOpen}
        setOpen={setIsCompleteDialogOpen}
        description={t("login.forget_password_successfully")}
      />
    </Box>
  )
}
