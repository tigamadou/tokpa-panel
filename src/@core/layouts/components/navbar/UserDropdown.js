/* eslint-disable no-unused-vars */

// ** React Imports
import { Link, Redirect, useHistory } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'
import { useTranslation } from 'react-i18next'
import { IKImage } from 'imagekitio-react'


// ** Utils

// ** Third Party Components
import { Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogout, updateUserInfo } from '../../../../redux/authentication'
import { useEffect } from 'react'
import useFetch from '../../../../views/hooks/useFetch'
import { toast } from 'react-toastify'

const UserDropdown = () => {
  // ** State
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading, error, data, get } = useFetch()
  // ** ComponentDidMount
  const userAvatar = (userData && userData.avatar) || defaultAvatar
  const history = useHistory()
  // useEffect(() => {
  //   try {
  //     get("/me")
  //   } catch (error) {

  //   }
  // }, [])
  useEffect(() => {
    if (error) {
      dispatch(handleLogout())
      toast.info(t('messages.logged_out'))
      history.push("/login")
    }
  }, [error])
  useEffect(() => {
    if (data) {
      dispatch(updateUserInfo(data))
      localStorage.setItem('userRole', data.role)
    }
  }, [data])
  //** Vars

  const onLogout = event => {
    event.preventDefault()
    dispatch(handleLogout())
    toast.info(t('messages.logged_out'))
    history.push("/login")
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData.firstname && `${userData.firstname} ${userData.lastname}`) || 'John Doe'}</span>
          <span className='user-status'>{(userData && userData.role) || 'Administrator'}</span>
        </div>

        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem onClick={onLogout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
