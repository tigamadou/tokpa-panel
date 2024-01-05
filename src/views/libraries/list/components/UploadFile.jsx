import React from 'react'
import { Modal, Button, Input, ModalHeader, ModalBody, Spinner } from 'reactstrap'
import { Upload, UploadCloud } from "react-feather"

const UploadFileComponent = (
    { 
        show,
        setShow,
        showModal,
        loading,
        onUploadFile,
        handleFileChange,
        fileIsSelected,
        fileInputRef
    }) => {

  return (
    <>
      <Button.Ripple
        outline
        className="btn-icon rounded-circle"
        type="primary"
        color='primary'
        onClick={showModal}
      >
        <Upload size={20} />
      </Button.Ripple>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg' style={{ maxWidth: 600 }}>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}>Uploader un fichier</ModalHeader>
        <ModalBody className='px-sm-5 pt-50'>
          <Input
            type='file'
            onChange={handleFileChange}
            disabled={loading}
            ref={fileInputRef}
          />
          <div className='d-flex justify-content-end mt-2'>
            {loading ? (
              <Spinner color="danger">Loading...</Spinner>
            ) : (
              <Button
                type="primary"
                color='primary'
                onClick={() => onUploadFile()}
                disabled={loading || !fileIsSelected}
              >
                Uploader <UploadCloud size={20} />
              </Button>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export { UploadFileComponent }
