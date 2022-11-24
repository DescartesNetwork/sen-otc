import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

import configs from 'configs'

const {
  system: { adminAddresses },
} = configs

export enum Role {
  Guest,
  User,
  Admin,
}

export const useRole = () => {
  const { publicKey } = useWallet()
  if (!publicKey) return Role.Guest
  if (adminAddresses.includes(publicKey.toBase58())) return Role.Admin
  return Role.User
}

export const usePremission = (roles: Role[] = []) => {
  const role = useRole()
  return roles.includes(role)
}

export const useIsLoggedIn = () => {
  const { publicKey } = useWallet()
  return !!publicKey
}

export const useLogIn = () => {
  const isLoggedIn = useIsLoggedIn()
  const { visible, setVisible } = useWalletModal()
  if (isLoggedIn || visible) return () => {}
  return () => setVisible(true)
}
