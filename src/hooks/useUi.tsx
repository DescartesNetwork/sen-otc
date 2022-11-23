import { useSelector } from 'react-redux'
import { AppState } from 'store'

export const useInfix = () => {
  const infix = useSelector(({ ui }: AppState) => ui.infix)
  return infix
}

export const useWidth = () => {
  const width = useSelector(({ ui }: AppState) => ui.width)
  return width
}

export const useTheme = () => {
  const theme = useSelector(({ ui }: AppState) => ui.theme)
  return theme
}
