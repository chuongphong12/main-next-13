import React from 'react'
export interface ResizeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string
  src: string
  baseWidth?: number
  baseHeight?: number
}

export interface IFileSize {
  width: number | string
  height: number | string
}
