// ** React Imports
import { Fragment } from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import IntlDropdown from './IntlDropdown'
const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />

          </NavLink>
        </NavItem>
      </div>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <IntlDropdown />
        <UserDropdown />
      </ul>

    </Fragment>
  )
}
export default NavbarUser
