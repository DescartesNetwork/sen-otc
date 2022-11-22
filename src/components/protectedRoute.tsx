import { useWallet } from '@solana/wallet-adapter-react'
import { Navigate } from 'react-router-dom'

export type ProtectedRouteProps = { children: JSX.Element }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { publicKey } = useWallet()
  const pathname = encodeURIComponent(
    window.location.href.replace(window.location.origin, ''),
  )
  if (publicKey) return children
  return <Navigate to={'/home?redirect=' + pathname} />
}

export default ProtectedRoute
