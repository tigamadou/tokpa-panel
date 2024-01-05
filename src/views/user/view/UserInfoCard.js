// ** React Imports
import { useState, Fragment, useRef } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, Spinner } from 'reactstrap'
import { IKImage } from "imagekitio-react"

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import { useTranslation } from 'react-i18next'
import InputPasswordToggle from '@components/input-password-toggle'
import { useUploadFile } from "../../../utility/hooks/useFiles"

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getUsers } from '../store'
import useFetch from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const roleColors = {
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  maintainer: 'light-success',
  subscriber: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]
const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  const { t } = useTranslation()
  // ** State
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState(statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)])
  const [contact, setContact] = useState(selectedUser.contact)
  const [role, setRole] = useState(selectedUser.role)
  const fileInputRef = useRef(null)
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: selectedUser.email,
      lastName: selectedUser.lastname,
      firstName: selectedUser.firstname,
      avatar: selectedUser.avatar,
      password: '',
      password_confirmation: ''
    }
  })
  const dispatch = useDispatch()
  const { get: getUserList, put } = useFetch()
  const history = useHistory()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImageSelected(true)
    }
  }

  const onSubmitAvatar = (image) => {
    const data = {
      avatar: image.key
    }
    put(`/upload-avatar/${selectedUser.id}`, JSON.stringify(data))
      .then((res) => {
        if (res.status === 200) {
          setLoading(false)
          setIsUpdatingAvatar(false)
          setImageSelected(false)
          toast.success(t('messages.user_updated_successfully'))
          getUserList("/users").then((res) => {
            dispatch(
              getUsers({
                allData: res ? res : []
              })
            )
          })
        }
        history.push("/user/list")
      }).catch((err) => {
        toast.error("Mise a jour echoué")
        console.log(err.message)
        setLoading(false)
        setIsUpdatingAvatar(false)
        setImageSelected(false)
      })
  }
  const uploadCover = () => {
    setLoading(true)
    useUploadFile(selectedFile, onSubmitAvatar)
  }

  const uploadAvatar = () => {
    return (
      <>
        {isUpdatingAvatar ? (
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        ) : null}

        {!isUpdatingAvatar ? (
          <Button color='primary' className="btn-sm" onClick={() => setIsUpdatingAvatar(!isUpdatingAvatar)}>
            {t('actions.edit')}
          </Button>
        ) : (
          <div className='d-flex justify-content-center pt-2 pb-2'>
            <Button color='primary' className="btn-sm mx-5" disabled={!imageSelected} onClick={() => uploadCover()}>
              {t('buttons.save')}{'  '}
              {loading ? (
                <Spinner
                  style={{ width: "0.7rem", height: "0.7rem" }}
                  type="grow"
                  color="light"
                />
              ) : null}
            </Button>
            <Button color='secondary' className="btn-sm ml-5" onClick={() => {
              setImageSelected(false)
              setIsUpdatingAvatar(false)
            }}>
              {t('actions.cancel')}
            </Button>
          </div>
        )}
      </>
    )
  }

  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser.avatar) {
      return (
        <>
          <IKImage
            className='img-fluid rounded mt-3 mb-2'
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_ENDPOINT}

            path={selectedUser.avatar}
            transformation={[
              {
                height: 110,
                width: 110
              }
            ]}
          />
          {uploadAvatar()}
        </>
      )
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <>
          <Avatar
            initials
            color={color}
            className='rounded mt-3 mb-2'
            content={`${selectedUser.lastname} ${selectedUser.firstname}`}
            contentStyles={{
              borderRadius: 0,
              fontSize: 'calc(48px)',
              width: '100%',
              height: '100%'
            }}
            style={{
              height: '200px',
              width: '200px'
            }}
          />
          {uploadAvatar()}
        </>
      )
    }
  }

  const onSubmit = data => {
    const payload = {
      role,
      status: status.value,
      email: data.email,
      contact,
      firstname: data.firstName,
      lastname: data.lastName,
      password: data.password,
      avatar: data.avatar
    }

    const nonEmptyFields = {}

    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        if (payload[key].length > 0) {
          nonEmptyFields[key] = payload[key]
        }
      }
    }

    put(`/user/${selectedUser.id}`, JSON.stringify(nonEmptyFields))
      .then((res) => {
        if (res.status === 200) {
          toast.success(t('messages.user_updated_successfully'))
          getUserList("/users").then((res) => {
            dispatch(
              getUsers({
                allData: res ? res : []
              })
            )
          })
        }
        history.push("/user/list")
      })
      .catch(err => console.log(err.message))
    setShow(false)
  }

  const handleReset = () => {
    reset({
      email: selectedUser.email,
      lastName: selectedUser.lastname,
      firstName: selectedUser.firstname
    })
  }

  const handleBack = () => {
    history.push("/user/list")
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h3>{selectedUser !== null ? `${selectedUser.firstname} ${selectedUser.lastname}` : 'Eleanor Aguilar'}</h3>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>

          </div>
          {/* <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4> */}
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('fields.last_name')}:</span>
                  <span>{selectedUser.lastname}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('fields.first_name')}:</span>
                  <span>{selectedUser.firstname}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'> {t('fields.email')}:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('table.status')}:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.status]}>
                    {selectedUser.status}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('table.role')}:</span>
                  <span className='text-capitalize'>{selectedUser.role}</span>
                </li>

                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('fields.contact')}:</span>
                  <span>{selectedUser.contact}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            {!selectedUser.isAdmin && (
              <Button color='primary' onClick={() => setShow(true)}>
                {t('actions.edit')}
              </Button>
            )}
            <Button className='ms-1' color='danger' outline onClick={handleBack}>
              {t('buttons.back_to_list')}
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>{t('title.edit_user_information')}</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  {t('fields.first_name')}
                </Label>
                <Controller
                  defaultValue={selectedUser.firstName}
                  control={control}
                  id='firstName'
                  name='firstName'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  {t('fields.last_name')}
                </Label>
                <Controller
                  defaultValue={selectedUser.lastName}
                  control={control}
                  id='lastName'
                  name='lastName'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  {t('fields.email')}
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  disabled
                  defaultValue={selectedUser.email}
                  placeholder='example@domain.com'
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  {t('table.status')}:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                  value={status}
                  onChange={setStatus}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  {t('fields.contact')}
                </Label>
                <Input id='contact' value={contact} onChange={e => setContact(e.target.value)} placeholder='+1 609 933 4422' />
              </Col>
              <Col md={6} xs={12}>
                <div className='mb-1'>
                  <Label className='form-label' for='user-role'>
                    {t('fields.select_user_role')}
                  </Label>
                  <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
                    <option value='Subscriber'>{t('permissions.subscriber')}</option>
                    <option value='Contributor'>{t('permissions.contributor')}</option>
                    <option value='Editor'>{t('permissions.editor')}</option>
                    <option value='Administrator'>{t('permissions.administrator')}</option>
                  </Input>
                </div>
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='password'>
                  {t('fields.password')}
                </Label>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && false} {...field} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='confirm-password'>
                  {t('fields.password_confirmation')}
                </Label>
                <Controller
                  id='password_confirmation'
                  name='password_confirmation'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && false} {...field} />
                  )}
                />
              </Col>

              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  {t('buttons.submit')}
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  {t('actions.cancel')}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
