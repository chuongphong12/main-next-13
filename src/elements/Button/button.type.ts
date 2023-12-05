import { ButtonProps as MButtonProps } from '@mui/material'
import { ElementType, ReactNode } from 'react'

const buttontype = {
  default: 'default',
  active: 'active',
}

const buttoncate = {
  primary: 'primary',
  secondary: 'secondary',
}

export type ButtonType = keyof typeof buttontype
export type ButtonCate = keyof typeof buttoncate

export type ButtonProps = MButtonProps &
{
  component?: ElementType
  cate?: any
  customTitle?: ReactNode
  isLoading?: boolean
  customType?: any
  rounded?: boolean
  customSize?: any
  isNonSubmit?: boolean
  isOnFormPopup?: boolean
}
