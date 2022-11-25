import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'

import { Role, useRole } from 'hooks/useAuth'

const FALLBACK = '/home'

export type ProtectedRouteProps = { children: JSX.Element; onlyAdmin?: boolean }

export const ProtectedRoute = ({
  children,
  onlyAdmin = false,
}: ProtectedRouteProps) => {
  const role = useRole()
  const pathname = encodeURIComponent(
    window.location.href.replace(window.location.origin, ''),
  )

  if (role === Role.Guest)
    return <Navigate to={`${FALLBACK}?redirect=${pathname}`} />
  if (onlyAdmin && role !== Role.Admin) return <Navigate to={FALLBACK} />
  return children
}

export type ProtectedNavigatorProps = { children: JSX.Element }

export const ProtectedNavigator = ({ children }: ProtectedNavigatorProps) => {
  const navigate = useNavigate()
  const { search, pathname } = useLocation()
  const { publicKey } = useWallet()

  // Redirect callback
  useEffect(() => {
    if (pathname.startsWith(FALLBACK)) {
      const params = new URLSearchParams(search)
      const redirect = params.get('redirect')
      if (publicKey && redirect) navigate(decodeURIComponent(redirect))
    }
  }, [publicKey, navigate, search, pathname])

  return children
}
