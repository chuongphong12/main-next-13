import { ImageProps } from "next/legacy/image"
export interface ProgressiveImageProps extends ImageProps {
  placeholderSrc: string
  src: string
  cache?: boolean
}
