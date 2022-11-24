import { MouseEvent, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'

import IconSax from '@sentre/antd-iconsax'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const WalletButton = () => {
  const { disconnect, publicKey, wallet, connecting } = useWallet()

  const onDisconnect = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      return disconnect()
    },
    [disconnect],
  )

  return (
    <WalletMultiButton
      endIcon={
        wallet && !publicKey && !connecting ? (
          <IconSax name="CloseCircle" onClick={onDisconnect} />
        ) : undefined
      }
    />
  )
}

export default WalletButton
