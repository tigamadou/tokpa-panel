// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getUsers } from '../store'
import useFetch from '../../hooks/useFetch'
import { useTranslation } from 'react-i18next'

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0)) || Object.values(data).every(field => field !== null)
}

const SidebarNewUsers = ({ open, toggleSidebar, user }) => {
  const defaultValues = {
    email: user ? user.email : '',
    contact: user ? user.contact : '',
    firstname: user ? user.firstname : '',
    lastname: user ? user.lastname : '',
    password: user ? user.password : '',
    avatar: user ? user.avatar : ''
  }
  // ** States
  const [role, setRole] = useState(user ? user.role : 'Administrator')
  // ** Store Vars
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { post, get: getUserList, put } = useFetch()

  // ** Vars
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    if (checkIsValid(data)) {
      const payload = {
        role,
        status: 'active',
        email: data.email,
        password: data.password,
        contact: data.contact,
        firstname: data.firstname,
        lastname: data.lastname,
        avatar: data.avatar
      }
      if (user) {
        put(`/user/${user.id}`, JSON.stringify(payload)).then((res) => {
          if (res.status === 200) {
            toast.success(t('messages.user_updated_successfully'))
            getUserList("/users").then((res) => {
              dispatch(
                getUsers({
                  allData: res ? res : []
                })
              )
            })
            toggleSidebar()
          }
        }).catch(err => console.log(err.message))

      } else {
        post("/users", JSON.stringify(payload)).then((res) => {
          if (res && res.status === 201) {
            toast.success(t('messages.user_added_successfully'))
            getUserList("/users").then((res) => {
              dispatch(
                getUsers({
                  allData: res ? res : []
                })
              )
            })
            toggleSidebar()
          } else if (typeof (res) === "string") {
            toast.error(res)
          }
        }).catch(err => console.log(err.message))
      }
    } else {
      toast.error(t('messages.fill_fields_correctly'))
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={t('title.new_user')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='firstname'>
            {t('fields.first_name')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='firstname'
            control={control}
            render={({ field }) => (
              <Input id='fullName' placeholder='John Doe' invalid={errors.firstname && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='lastname'>
            {t('fields.last_name')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='lastname'
            control={control}
            render={({ field }) => (
              <Input id='lastname' placeholder='johnDoe99' invalid={errors.lastname && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            {t('fields.email')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                disabled={user}
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />

        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>
            {t('fields.password')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                type='password'
                id='userPassword'
                placeholder='************'
                invalid={errors.password && true}
                {...field}
              />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='contact'>
            {t('fields.contact')} <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='contact'
            control={control}
            render={({ field }) => (
              <Input id='contact' type='number' onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                placeholder='(397) 294-5153' invalid={errors.contact && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='user-role'>
            {t('fields.user_role')}
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value="" selected hidden >{t('fields.select_user_role')}</option>
            <option value='Subscriber'>{t('permissions.subscriber')}</option>
            <option value='Contributor'>{t('permissions.contributor')}</option>
            <option value='Editor'>{t('permissions.editor')}</option>
            <option value='Administrator'>{t('permissions.administrator')}</option>
          </Input>
        </div>
        <Button type='submit' className='me-1' color='primary'>
          {t('buttons.submit')}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          {t('actions.cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
