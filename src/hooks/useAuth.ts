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

/**
 * Get role
 * @returns
 */
export const useRole = () => {
  const { publicKey } = useWallet()
  if (!publicKey) return Role.Guest
  if (adminAddresses.includes(publicKey.toBase58())) return Role.Admin
  return Role.User
}

/**
 * Get checked permission (whether role is in the predefined roles)
 * @returns
 */
export const usePremission = (roles: Role[] = []) => {
  const role = useRole()
  return roles.includes(role)
}

/**
 * Get checked login
 * @returns
 */
export const useIsLoggedIn = () => {
  const { publicKey } = useWallet()
  return !!publicKey
}

/**
 * Get login function
 * @returns
 */
export const useLogIn = () => {
  const isLoggedIn = useIsLoggedIn()
  const { visible, setVisible } = useWalletModal()
  if (isLoggedIn || visible) return () => {}
  return () => setVisible(true)
}
