import { useUI } from '@senhub/providers'

const DESKTOP_MIN_WIDTH = 1200

export const useDevice = () => {
  const {
    ui: { width, infix },
  } = useUI()

  const isDesktop = width > DESKTOP_MIN_WIDTH
  const isMobile = infix === 'xs'

  return { isDesktop, isMobile }
}
