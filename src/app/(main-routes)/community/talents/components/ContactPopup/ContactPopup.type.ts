import React from 'react'
import { DialogProps } from '@mui/material'
import { IPool } from 'types/pool.type'

const PopupTheme = {
  default: 'default',
  dark: 'dark'
}

export type PopupThemeType = keyof typeof PopupTheme

export type ContactPopupProps = DialogProps & {
  title?: string
  type?: keyof typeof PopupTheme
  description?: React.ReactNode
  cancelTitle?: string
  submitTitle?: string
  id: string
  poolData: IPool
  onCancel?: () => void
} & (
    | {
      onSubmit: () => void
    }
    | {
      onCancel?: () => void
    }
  )
