import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { getCategories } from "../store"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'


export default function DeleteModal(props) {
  const { destroy, get } = useFetch()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const onHandleDelete = (e) => {
    e.preventDefault()
    destroy(`/category/${props.row.id}`).then(() => {
      get("/category/").then((res) => {
        if (res) {
          dispatch(
            getCategories({
              allData: res,
              total: res.length
            })
          )
        }
        toast.error(t('messages.category_deleted_successfully'))
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
          {t('title.deleting_category')}
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
