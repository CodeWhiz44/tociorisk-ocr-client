import React from "react"
import { Dialog, Box, Typography, Grid, TextField, Button } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useRecoilState } from "recoil"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import * as Yup from "yup"

import { WorkingDialog } from "src/components/workingDialog"

import { invitationDialogOpenState } from "src/states/sidebar"
import { useInviteUser } from "src/queries/login"
import { InviteUserApiInputs } from "src/types/users"
import * as Validator from "src/modules/validation"

const validationSchema = Yup.object().shape({
  email: Validator.emailSchema(),
  firstName: Validator.nameKanjiOrKatakanaSchema(),
  lastName: Validator.nameKanjiOrKatakanaSchema(),
  firstNameKatakana: Validator.nameKatakanaSchema(),
  lastNameKatakana: Validator.nameKatakanaSchema(),
})

interface UserInvitationDialogProps {
  setCompleteOpen: Function
}

export const UserInvitationDialog: React.FC<UserInvitationDialogProps> = ({ setCompleteOpen }) => {
  const { t } = useTranslation()
  const [invitationDialogOpen, setInvitationDialogOpen] = useRecoilState(invitationDialogOpenState)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InviteUserApiInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      firstNameKatakana: "",
      lastNameKatakana: "",
    },
  })

  const { mutate: inviteUser, isLoading: isInviting } = useInviteUser({
    onSuccess: () => {
      setInvitationDialogOpen(false)
      setCompleteOpen(true)
    },
    onError: (err: AxiosError) => {
      console.error(err.message)
    },
  })

  const onSubmit = (data: InviteUserApiInputs) => {
    inviteUser({ data })
  }

  return (
    <Dialog
      open={invitationDialogOpen}
      onClose={() => setInvitationDialogOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ bgcolor: "background.default" }}>
          <Typography.DetailHeading
            sx={{
              color: "primary.main",
              mr: "1rem",
              p: "1rem 1.375rem",
              borderWidth: "0 0 1px 0",
              borderStyle: "solid",
              borderColor: "text.disabled",
            }}
          >
            {t("sidebar.user_invitation")}
          </Typography.DetailHeading>
          <Box sx={{ p: "1.5rem" }}>
            <Grid container spacing={3} sx={{ mb: "1.5rem" }}>
              <Grid item xs={12}>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("common.email")}
                </Typography.Action>
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("my_page.kanji_last_name")}
                </Typography.Action>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? t(`error.${errors.lastName.message}`) : undefined
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("my_page.kanji_first_name")}
                </Typography.Action>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName ? t(`error.${errors.firstName.message}`) : undefined
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("my_page.katakana_last_name")}
                </Typography.Action>
                <Controller
                  name="lastNameKatakana"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      value={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        const newVal = e.target.value
                          .split("")
                          .reduce(
                            (prev, cur) =>
                              prev +
                              (cur.charCodeAt(0) >= 0x3040 && cur.charCodeAt(0) <= 0x309f
                                ? String.fromCharCode(cur.charCodeAt(0) + 0x60)
                                : cur),
                            ""
                          )
                        field.onChange(newVal)
                      }}
                      error={!!errors.lastNameKatakana}
                      helperText={
                        errors.lastNameKatakana
                          ? t(`error.${errors.lastNameKatakana.message}`)
                          : undefined
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("my_page.katakana_first_name")}
                </Typography.Action>
                <Controller
                  name="firstNameKatakana"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      value={field.value}
                      onChange={(e) => {
                        const newVal = e.target.value
                          .split("")
                          .reduce(
                            (prev, cur) =>
                              prev +
                              (cur.charCodeAt(0) >= 0x3040 && cur.charCodeAt(0) <= 0x309f
                                ? String.fromCharCode(cur.charCodeAt(0) + 0x60)
                                : cur),
                            ""
                          )
                        field.onChange(newVal)
                      }}
                      error={!!errors.firstNameKatakana}
                      helperText={
                        errors.firstNameKatakana
                          ? t(`error.${errors.firstNameKatakana.message}`)
                          : undefined
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button role="submit" sx={{ letterSpacing: "2px" }} type="submit">
                {t("user_invitation.invite")}
              </Button>
            </Box>
          </Box>
          <WorkingDialog open={isInviting} description={t("user_invitation.inviting")} />
        </Box>
      </form>
    </Dialog>
  )
}
