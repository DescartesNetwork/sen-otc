import { CSSProperties } from 'react'

import { Avatar } from 'antd'

import { useMetadataByAddress } from 'hooks/useToken'
import IconSax from '@sentre/antd-iconsax'

export type MintAvatarProps = {
  mintAddress?: string
  size?: number
  style?: CSSProperties
}

export const MintAvatar = ({
  mintAddress = '',
  size = 40,
  style = {},
}: MintAvatarProps) => {
  const { url } = useMetadataByAddress(mintAddress) || { url: '' }

  return (
    <Avatar src={url} size={size} style={style}>
      <IconSax name="Solana" />
    </Avatar>
  )
}

export type MintSymbolProps = {
  mintAddress?: string
  style?: CSSProperties
}

export const MintSymbol = ({
  mintAddress = '',
  style = {},
}: MintSymbolProps) => {
  const { symbol } = useMetadataByAddress(mintAddress) || { symbol: '--' }

  return <span style={style}>{symbol}</span>
}
