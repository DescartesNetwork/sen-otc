import { useWallet } from '@solana/wallet-adapter-react'

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
