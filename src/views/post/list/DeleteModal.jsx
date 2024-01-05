import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { getPosts } from "../store"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'


export default function DeleteModal(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    destroy(`/post/${props.row.id}`).then(() => {
      get("/post/").then((res) => {
        if (res) {
          dispatch(
            getPosts({
              allData: res,
              total: res.length
            })
          )
        }
        toast.error(t('messages.post_deleted'))
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
        {t('actions.deleting_post')}
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
