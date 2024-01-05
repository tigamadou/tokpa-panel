import { deleteDoc, doc, getDocs } from "firebase/firestore"
import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { db, menusRef } from "../../../firebase/base"
import { useTranslation } from 'react-i18next'
import { getMenus } from "../store"

export default function DeleteModal(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    const docRef = doc(db, "menus", props.row.id)
    deleteDoc(docRef).then(() => {
      getDocs(menusRef).then((snapshot) => {
        const menus = []
        snapshot.docs.forEach((doc) => {
          menus.push({ ...doc.data(), id: doc.id })
        })
        dispatch(
          getMenus({
            allData: menus
          })
        )
        toast.error(t('messages.menu_deleted_successfully'))
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
          {t('title.deleting_menu')}
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
