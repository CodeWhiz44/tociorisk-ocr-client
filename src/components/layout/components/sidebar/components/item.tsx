import React, { useState } from "react"
import {
  ListItemButton,
  Typography,
  Box,
  ExpandLessIcon,
  ExpandMoreIcon,
  Collapse,
  Popper,
  Fade,
  ClickAwayListener,
} from "src/UILibrary"
import { useTranslation } from "react-i18next"
import { useRecoilValue } from "recoil"
import { useNavigate } from "react-router-dom"

import { SubItem } from "./subItem"

import { SidebarItem } from "src/types/sidebar"
import { selectedSidebarItemState } from "src/states/sidebar"

interface ItemProps {
  item: SidebarItem
  open: boolean
}

export const Item: React.FC<ItemProps> = ({ item, open }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const selectedSidebarItem = useRecoilValue(selectedSidebarItemState)
  const [subItemOpen, setSubItemOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    if (item.subItems.length) {
      if (open) {
        setSubItemOpen(!subItemOpen)
      } else {
        setAnchorEl(anchorEl ? null : evt.currentTarget)
      }
    } else {
      navigate(item.link || "")
    }
  }

  return (
    <>
      <ListItemButton
        sx={{
          height: "50px",
          borderWidth: "0 0 0 0.25rem",
          borderColor: selectedSidebarItem === item.key ? "primary.main" : "transparent",
          borderStyle: "solid",
          px: "1.25rem",
          bgcolor: selectedSidebarItem === item.key ? "primary.light" : "transparent",
          "&:hover": {
            bgcolor: "primary.light",
            borderColor: selectedSidebarItem === item.key ? "primary.main" : "primary.light",
          },
        }}
        onClick={handleClick}
      >
        <item.Icon
          sx={{
            flexShrink: 0,
            width: "16px",
            height: "16px",
            color: selectedSidebarItem === item.key ? "primary.main" : "secondary.main",
            mr: open ? "1rem" : 0,
          }}
        />
        {open && (
          <>
            <Box sx={{ flexGrow: 1, overflow: "hidden", whiteSpace: "nowrap" }}>
              <Typography.Detail
                sx={{
                  color: selectedSidebarItem === item.key ? "primary.main" : "secondary.main",
                  letterSpacing: "5px",
                  fontWeight: 600,
                }}
              >
                {t(item.key)}
              </Typography.Detail>
            </Box>
            {!!item.subItems.length && <>{subItemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</>}
          </>
        )}
      </ListItemButton>
      {!!item.subItems.length && open && (
        <Collapse in={subItemOpen}>
          <Box
            sx={{
              "&>div:not(:last-child)": {
                borderWidth: "0 0 2px 0",
                borderStyle: "solid",
                borderColor: "text.disabled",
              },
            }}
          >
            {item.subItems.map((subItem) => (
              <SubItem key={subItem.key} subItem={subItem} open={open} />
            ))}
          </Box>
        </Collapse>
      )}
      {!!item.subItems.length && !open && !!anchorEl && (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Popper
            id="subitem-popper"
            open={!!anchorEl}
            anchorEl={anchorEl}
            transition
            placement="right-start"
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps}>
                <Box
                  sx={{
                    ml: "0.125rem",
                    width: "180px",
                    bgcolor: "background.paper",
                    "&>div:not(:last-child)": {
                      borderWidth: "0 0 2px 0",
                      borderStyle: "solid",
                      borderColor: "text.disabled",
                    },
                  }}
                >
                  {item.subItems.map((subItem) => (
                    <SubItem key={subItem.key} subItem={subItem} open={open} />
                  ))}
                </Box>
              </Fade>
            )}
          </Popper>
        </ClickAwayListener>
      )}
    </>
  )
}
