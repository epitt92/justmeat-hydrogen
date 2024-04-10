import { useContext } from 'react'

import { useNavigate } from '@remix-run/react'

import { Button } from '~/components/Button'
import { LayoutContext } from '~/contexts'

export const MenuNavLink = ({ to, children }) => {
  const navigate = useNavigate()
  const { setMenuToggle } = useContext(LayoutContext)

  const handleClick = () => {
    setMenuToggle(false)
    navigate(to, { replace: true })
  }

  return <Button onClick={handleClick}>{children}</Button>
}
