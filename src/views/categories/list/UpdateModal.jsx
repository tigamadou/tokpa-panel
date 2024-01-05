import React, { Fragment } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import CategoryForm from "./CategoryForm"
import { useTranslation } from 'react-i18next'


export default function UpdateModal(props) {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Modal
        size="lg"
        isOpen={props.modal}
        toggle={() => props.setModal(!props.modal)}
        className={`modal-dialog-centered`}
      >
        <ModalHeader toggle={() => props.setModal(!props.modal)}>
          {t('title.updating_category')}
        </ModalHeader>
        <ModalBody>
          <CategoryForm
            action="edit"
            data={props.row}
            modal={props.modal}
            setModal={props.setModal}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => props.setModal(!props.modal)}>
            {t('actions.cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}
