// ** React Imports
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { LanguageSelector }  from '@components/language-selector/index'
// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

const VerticalNavMenuLink = ({
  item,
  activeItem,
  setActiveItem,
  currentActiveItem
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink

  // ** Hooks
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
    }
  }, [location])

  return (
    <>
    {/* <LanguageSelector /> */}
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: match => {
                if (!match) {
                  return false
                }

                if (
                  match.url &&
                  match.url !== '' &&
                  match.url === item.navLink
                ) {
                  currentActiveItem = item.navLink
                }
              }
            })}
      >
        {item.icon}
        <span className='menu-item text-truncate'>{t(item.titleKey)}</span>

        {item.badge && item.badgeText ? (
          <Badge className='ms-auto me-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
    </>
  )
}

export default VerticalNavMenuLink
