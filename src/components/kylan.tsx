import { CSSProperties } from 'react'
import logo from 'static/images/logo.svg'

export type KylanProps = {
  size?: number
  onClick?: () => void
  style?: CSSProperties
}

const Kylan = ({ size = 24, onClick = () => {}, style = {} }: KylanProps) => {
  return (
    <img
      src={logo}
      height={size}
      alt="kylan"
      onClick={onClick}
      style={{ cursor: 'pointer', ...style }}
    />
  )
}

export default Kylan
