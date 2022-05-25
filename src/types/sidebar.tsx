import { OverridableComponent, SvgIconTypeMap } from "src/UILibrary"

export interface SidebarSubItem {
  key: string
  link: string
}

export interface SidebarItem {
  key: string
  subItems: SidebarSubItem[]
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string
  }
  link?: string
}
