import { useWallet } from '@solana/wallet-adapter-react'

import configs from 'configs'

const {
  system: { adminAddresses },
} = configs

export const useIsAdmin = () => {
  const { publicKey } = useWallet()
  return publicKey && adminAddresses.includes(publicKey.toBase58())
}
