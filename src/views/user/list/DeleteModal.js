import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { getUsers } from "../store"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'


export default function DeleteModal({ row, modal, setModal }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { get: getUserList, destroy } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    destroy(`/user/${row.id}`).then(() => {
      getUserList("/users").then((res) => {
        if (res) {
          dispatch(
            getUsers({
              allData: res
            })
          )
        }
        toast.error(t('messages.user_deleted_successfully'))
        setModal(!modal)
      })
    })
    // const userRef = doc(db, "users", row.id)
    // updateDoc(userRef, { ...row, deleted: true }).then(() => {
    //   const q = query(postsRef, orderBy("created_at", "desc"))
    //   getDocs(q).then((snapshot) => {
    //     const posts = []
    //     snapshot.docs.forEach((doc) => {
    //       posts.push({ ...doc.data(), id: doc.id })
    //     })
    //     dispatch(
    //       getData({
    //         allData: posts
    //       })
    //     )
    //     toast.error("User deleted succesfully !")
    //     setModal(!modal)
    //   })
    // })
  }
  return (
    <Fragment>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className={`modal-dialog-centered`}
      >
        <ModalHeader toggle={() => setModal(!modal)}>{t('title.deleting_user')}</ModalHeader>
        <ModalBody>
          <span className="bold">{t('messages.confirm')}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onHandleDelete(e)} outline>
            {t('actions.confirm')}
          </Button>
          <Button color="danger" onClick={() => setModal(!modal)}>
            {t('actions.cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
