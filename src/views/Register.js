// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { useTranslation } from 'react-i18next'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback, Spinner } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { toast } from 'react-toastify'
import axios from 'axios'
const defaultValues = {
  email: '',
  password: '',
  contact: '',
  firstname: '',
  lastname: ''
}

const Register = () => {
  // ** Hooks
  const { skin } = useSkin()
  const history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const [loading, setLoading] = useState(false)
  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    const tempData = { ...data }
    delete tempData.terms
    const { password, password_confirmation } = data
    if (password !== password_confirmation) {
      toast.error(t('messages.passwords_should_match'))
      return
    }

    if (Object.values(tempData).every(field => field.length > 0)) {
      setLoading(true)

      const payload = {
        role: "Contributor",
        status: 'active',
        email: data.email,
        contact: data.contact,
        firstname: data.firstname,
        lastname: data.lastname,
        permission: "All",
        password

      }
      axios.post("/auth/signup", payload).then(res => {
        if (res) {
          dispatch(handleLogin({ ...res.data }))
          localStorage.setItem('token', res.data.token)
          toast.success(t('messages.signed_up_successfully'))
          history.push('/')
        }
      }).catch(err => {
        console.error(err)
        toast.error(t('messages.registration_failed'))
      })
      setLoading(false)
    } else {
      toast(t('fields.fill_fields_correctly'))
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ms-1'>Tokpa BJ</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Tokpa BJ Admin 🚀
            </CardTitle>
            <CardText className='mb-2'>{t('title.registration')}</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h5>{t('title.user_profile_details')}</h5>
                <hr />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>
                  {t('fields.email')}
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input type='email' placeholder='john@example.com' invalid={errors.email && true} {...field} disabled={loading} />
                  )}
                />
                {errors.email ? <FormFeedback>{errors.email.message}</FormFeedback> : <></>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-firstname'>
                  {t('fields.first_name')}
                </Label>
                <Controller
                  id='firstname'
                  name='firstname'
                  control={control}
                  render={({ field }) => (
                    <Input type='text' placeholder='john' invalid={errors.firstname && true} {...field} disabled={loading} />
                  )}
                />
                {errors.firstname ? <FormFeedback>{errors.firstname.message}</FormFeedback> : <></>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-firstname'>
                  {t('fields.last_name')}
                </Label>
                <Controller
                  id='lastname'
                  name='lastname'
                  control={control}
                  render={({ field }) => (
                    <Input type='text' placeholder='DOE' invalid={errors.lastname && true} {...field} disabled={loading} />
                  )}
                />
                {errors.lastname ? <FormFeedback>{errors.lastname.message}</FormFeedback> : <></>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-firstname'>
                  {t('fields.contact')}
                </Label>
                <Controller
                  id='contact'
                  name='contact'
                  control={control}
                  render={({ field }) => (
                    <Input type='number' placeholder='xxx-xxx-xxx' invalid={errors.contact && true} {...field} disabled={loading} />
                  )}
                />
                {errors.contact ? <FormFeedback>{errors.contact.message}</FormFeedback> : <></>}
              </div>
              <div className='pt-2'>
                <h5>{t('messages.set_password_to_protect_account')}</h5>
                <hr />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  {t('fields.password')}
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} disabled={loading} />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>
                  {t('fields.password_confirmation')}
                </Label>
                <Controller
                  id='password_confirmation'
                  name='password_confirmation'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} disabled={loading} />
                  )}
                />

              </div>

              <Button type='submit' block color='primary' disabled={loading}>
                <span>{t('buttons.sign_up')}</span>
                {loading &&
                  <Spinner color="light" size={'sm'} style={{ marginLeft: '8px' }} />
                }
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>{t('messages.already_have_an_account')}</span>
              <Link to='/login'>
                <span>{t('buttons.sign_in_instead')}</span>
              </Link>
            </p>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
