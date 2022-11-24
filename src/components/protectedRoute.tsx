import { Navigate } from 'react-router-dom'

import { Role, useRole } from 'hooks/useAuth'

export type ProtectedRouteProps = { children: JSX.Element; onlyAdmin?: boolean }

const ProtectedRoute = ({
  children,
  onlyAdmin = false,
}: ProtectedRouteProps) => {
  const role = useRole()
  const pathname = encodeURIComponent(
    window.location.href.replace(window.location.origin, ''),
  )
  if (role === Role.Guest) return <Navigate to={'/home?redirect=' + pathname} />
  if (onlyAdmin && role === Role.Admin) return <Navigate to={'/home'} />
  return children
}

export default ProtectedRoute
