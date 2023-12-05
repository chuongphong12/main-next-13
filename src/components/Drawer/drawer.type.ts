import { ListItemProps } from '@mui/material'
import { ReactNode } from 'react'

export interface ListItemLinkProps extends ListItemProps {
  to?: string
  open?: boolean | undefined | null
  text?: string
  onClick?: () => void | undefined
  icon?: ReactNode
  activeIcon?: ReactNode
  highlight?: boolean | undefined
  isParent?: boolean
  drawerOpen?: boolean
  child?: any[]
}
