import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router-dom'

import { useIsAdmin } from 'hooks/useRole'

export type ProtectedRouteProps = { children: JSX.Element; onlyAdmin?: boolean }

const ProtectedRoute = ({
  children,
  onlyAdmin = false,
}: ProtectedRouteProps) => {
  const { publicKey } = useWallet()
  const isAdmin = useIsAdmin()
  const pathname = encodeURIComponent(
    window.location.href.replace(window.location.origin, ''),
  )
  if (!publicKey) return <Navigate to={'/home?redirect=' + pathname} />
  if (onlyAdmin && !isAdmin) return <Navigate to={'/home'} />
  return children
}

export default ProtectedRoute
