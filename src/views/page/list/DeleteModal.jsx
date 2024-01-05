import React, { Fragment } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { getPages } from "../store"
import useFetch from "../../hooks/useFetch"

export default function DeleteModal(props) {
  const dispatch = useDispatch()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    destroy(`/page/${props.row.id}`).then(() => {
      get("/page/").then((res) => {
        if (res) {
          dispatch(
            getPages({
              allData: res,
              total: res.length
            })
          )
        }
        toast.error("Page deleted succesfully !")
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
          Deleting Page
        </ModalHeader>
        <ModalBody>
          <span className="bold">Are you sure ?</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => onHandleDelete(e)} outline>
            Confirm
          </Button>
          <Button color="danger" onClick={() => props.setModal(!props.modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
