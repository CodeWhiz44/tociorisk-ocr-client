import { AttachFileIcon, BuildOutlinedIcon, DeleteOutlineIcon } from "src/UILibrary"

import { SidebarItem } from "src/types/sidebar"

export const links: SidebarItem[] = [
  { key: "sidebar.file", subItems: [], Icon: AttachFileIcon, link: "/" },
  {
    key: "sidebar.setting",
    subItems: [
      {
        key: "sidebar.user_invitation",
        link: "/",
      },
      { key: "sidebar.my_page", link: "/my-page" },
    ],
    Icon: BuildOutlinedIcon,
  },
  { key: "sidebar.trash", subItems: [], Icon: DeleteOutlineIcon, link: "/trash" },
]
