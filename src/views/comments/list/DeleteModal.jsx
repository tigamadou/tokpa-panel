import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { getComments } from "../store"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'


export default function DeleteModal(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    destroy(`/comments/${props.row.id}`).then(() => {
      get("/comments/").then((res) => {
        if (res) {
          dispatch(
            getComments({
              allData: res,
              total: res.length
            })
          )
        }
        toast.error(t('messages.comment_deleted'))
        props.setModal(!props.modal)
      })
    })
  }
  return (
    <Fragment>
      <Modal
        isOpen={props.modal}
        toggle={() => props.setModal(!props.modal)}
        className={`modal-dialog-centered`}
      >
        <ModalHeader toggle={() => props.setModal(!props.modal)}>
        {t('actions.comment_post')}
        </ModalHeader>
        <ModalBody>
          <span className="bold">{t('messages.confirm')}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onHandleDelete(e)} outline>
            {t('actions.confirm')}
          </Button>
          <Button color="danger" onClick={() => props.setModal(!props.modal)}>
            {t('actions.cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
