import React, { useEffect, useState } from "react"
import { Box, Button, Typography, Avatar, Grid, TextField } from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useSetRecoilState } from "recoil"

import { selectedSidebarItemState, selectedSidebarSubItemState } from "src/states/sidebar"

export const MyPage: React.FC = () => {
  const { t } = useTranslation()
  const setSelectedSidebarItem = useSetRecoilState(selectedSidebarItemState)
  const setSelectedSidebarSubItem = useSetRecoilState(selectedSidebarSubItemState)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    setSelectedSidebarItem("sidebar.setting")
    setSelectedSidebarSubItem("sidebar.my_page")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        overflow: "overlay",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "10rem 2rem",
      }}
    >
      <Box
        sx={{
          maxWidth: "1050px",
          width: "100%",
          bgcolor: "background.default",
          borderRadius: "0.25rem",
          position: "relative",
        }}
      >
        {!isEditing && (
          <Button
            sx={{
              position: "absolute",
              top: "1.25rem",
              right: "1rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              lineHeight: "1.25rem",
              py: "0.25rem",
              minWidth: "80px",
              borderColor: "primary.main",
              color: "primary.main",
            }}
            onClick={() => setIsEditing(true)}
          >
            {t("common.edit")}
          </Button>
        )}
        <Box sx={{ p: "2.625rem" }}>
          <Box sx={{ maxWidth: "600px", mx: "auto" }}>
            <Typography.Heading
              sx={{
                letterSpacing: "2px",
                color: "primary.main",
                textAlign: "center",
                mb: "1.5rem",
              }}
            >
              {t("sidebar.my_page")}
            </Typography.Heading>
            <Box sx={{ display: "flex", justifyContent: "center", mb: "1.5rem" }}>
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  color: "background.default",
                  fontSize: "2rem",
                  lineHeight: "2rem",
                  fontWeight: 600,
                  width: "80px",
                  height: "80px",
                }}
              >
                山
              </Avatar>
            </Box>
            <Grid container spacing={3} sx={{ mb: "2.5rem" }}>
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
                <TextField fullWidth disabled={!isEditing} />
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
                <TextField fullWidth disabled={!isEditing} />
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
                <TextField fullWidth disabled={!isEditing} />
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
                <TextField fullWidth disabled={!isEditing} />
              </Grid>
            </Grid>
            {isEditing ? (
              <Box sx={{ mt: "1.375rem" }}>
                <Typography.DetailHeading sx={{ color: "primary.main", mb: "1rem" }}>
                  {t("my_page.enter_password_when_change")}
                </Typography.DetailHeading>
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("my_page.current_password")}
                </Typography.Action>
                <TextField fullWidth sx={{ mb: "1.5rem" }} />
                <Typography.Action
                  sx={{
                    fontWeight: 700,
                    lineHeight: "0.75rem",
                    mb: "0.25rem",
                    color: "secondary.main",
                  }}
                >
                  {t("login.new_password")}
                </Typography.Action>
                <TextField
                  fullWidth
                  sx={{ mb: "0.5rem" }}
                  placeholder={t("common.password_condition")}
                />
                <TextField
                  fullWidth
                  sx={{ mb: "1.5rem" }}
                  placeholder={t("common.confirm_password_condition")}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    role="submit"
                    sx={{ letterSpacing: 0 }}
                    onClick={() => setIsEditing(false)}
                  >
                    {t("common.save")}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
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
                <TextField type="password" fullWidth disabled value="********" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
