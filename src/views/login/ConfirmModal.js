// import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import React, { Fragment, useState } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Spinner } from "reactstrap"

export default function ConfirmModal(props) {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)


  const onHandleConfirm = (e) => {
    e.preventDefault()
    if (email) {
      setLoading(true)
    } else {
      toast.error(t('messages.enter_your_email'))
    }

  }
  return (
    <Fragment>
      <Modal
        isOpen={props.modal}
        toggle={() => props.setModal(!props.modal)}
        className={`modal-dialog-centered`}
      >
        <Form>
          <ModalHeader toggle={() => props.setModal(!props.modal)}>
            {t('title.confirm_password_reset')}
          </ModalHeader>
          <ModalBody>
            <span className="bold">{t('messages.enter_email_and_confirm')}</span>
            <Input className="my-2" type="text" onChange={e => setEmail(e.target.value)} disabled={loading} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => props.setModal(!props.modal)} outline disabled={loading}>
              {t('actions.cancel')}
            </Button>

            <Button color="primary" onClick={(e) => onHandleConfirm(e)} disabled={loading}>
              <span>{t('actions.confirm')}</span>
              {loading &&

                <Spinner color="light" size={'sm'} style={{ marginLeft: '8px' }} />
              }
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  )
}
