import React, { useState, useEffect, useRef } from 'react'
import { listObjects, renameFileInUserWorkspace, useDeleteFile, useUploadFileInUserWorkspace } from '../../../utility/hooks/useFiles'
import { Pagination, PaginationItem, PaginationLink, Row, Col, Spinner, Button, Card, CardBody, CardHeader, CardFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getLibraries } from "../store"
import { toast } from "react-toastify"
import { FileLibrary } from './components/FileLibrary'
import { UploadFileComponent } from "./components/UploadFile"
import { AlertCircle, RefreshCw } from 'react-feather'

const MediaLibraryView = () => {
  const [loading, setLoading] = useState(false)
  const [loadingUploadFile, setloadingUploadFile] = useState(false)
  const dispatch = useDispatch()
  const store = useSelector((state) => state.libraries)
  const userInfo = useSelector((state) => state.auth.userData)
  const [currentPage, setCurrentPage] = useState(store.currentPage)
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileIsSelected, setFileIsSelected] = useState(false)
  const [loadingOnDelete, setLoadingOnDelete] = useState(false)
  const [loadingOnEdit, setLoadingOnEdit] = useState(false)
  const [updateObjects, setUpdateObjects] = useState(0)
  const [userWorkspace, setUserWorkspace] = useState(null)
  const itemsPerPage = 24
  // File Upload  modal
  const [show, setShow] = useState(false)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const itemsToShow = store.data.slice(indexOfFirstItem, indexOfLastItem)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(store.data.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const paginationItems = pageNumbers.map((number) => (
    <PaginationItem key={number} active={number === currentPage}>
      <PaginationLink onClick={() => handlePageChange(number)}>
        {number}
      </PaginationLink>
    </PaginationItem>
  ))

  useEffect(() => {
    setUserWorkspace(`user_${userInfo.userId}`)
    setLoading(true)
    listObjects(userWorkspace, (result) => {
      if (result === false) {
        setLoading(false)
        console.error('Erreur lors de la récupération des objets.')
      } else {
        setLoading(false)

        dispatch(
          getLibraries({
            data: result ? result : [],
            total: result ? result.length : 0
          })
        )
      }
    })
  }, [dispatch, store.data.length, updateObjects])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileIsSelected(true)
      console.log(file)
      setSelectedFile(file)
    } else {
      setFileIsSelected(false)
    }
  }

  const onUploadFile = () => {
    setloadingUploadFile(true)
    useUploadFileInUserWorkspace(userWorkspace, selectedFile, (result) => {
      if (result === false) {
        toast.error("Failed to upload your file")
        setloadingUploadFile(false)
        setSelectedFile(null)
      } else {
        toast.success("Upload successfully")
        setloadingUploadFile(false)
        setShow(false)
        setSelectedFile(null)
        setUpdateObjects(updateObjects + 1)
      }
    })
  }

  const onDelete = (image) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")
    if (confirmDelete) {
      setLoadingOnDelete(true)
      useDeleteFile(image, (result) => {
        if (result === false) {
          setLoadingOnDelete(false)
          toast.error("Failed to delete your file")
          setUpdateObjects(updateObjects + 1)
        } else {
          setLoadingOnDelete(false)
          toast.success("Deleted successfully")
          setUpdateObjects(updateObjects + 1)
        }
      })
    } else {
      toast.info("Cancelled successfully")
    }
  }
  const handleSaveFileName = (oldName, newName) => {
    setLoadingOnEdit(true)
    renameFileInUserWorkspace(userWorkspace, oldName, newName, (result) => {
      if (result === false) {
        setLoadingOnEdit(false)
        setUpdateObjects(updateObjects + 1)
        toast.error("Could not rename file")
      } else {
        setLoadingOnEdit(false)
        setUpdateObjects(updateObjects + 1)
        toast.success("File renamed successfully")
      }
    })
  }

  return (
    <Card>
      <CardHeader className='bg-light'>
        <div className='d-flex justify-content-between'>
          <h5>Ma Bibliothèque Multimédia</h5>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button.Ripple
            className="btn-icon rounded-circle"
            outline
            color="primary"
            onClick={() => setUpdateObjects(updateObjects + 1)}
            size='xs'>
            <RefreshCw />
          </Button.Ripple>
          <UploadFileComponent
            show={show}
            setShow={setShow}
            showModal={() => setShow(true)}
            handleFileChange={handleFileChange}
            fileIsSelected={fileIsSelected}
            onUploadFile={onUploadFile}
            loading={loadingUploadFile}
            fileInputRef={fileInputRef}
          />
        </div>
      </CardHeader>
      <CardBody style={{paddingTop: '1.5rem'}}>
        <Row className='mb-5'>
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center my-2">
              <Spinner
                size="lg"
                className="me-25 my-2 text-primary"
                style={{ height: "50px", width: "50px" }}
              />
              <span>Chargement en cours...</span>
            </div>
          ) : (
            store.data.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center my-2">
                <AlertCircle size={48} color="red" />
                <p>Aucun élément trouvé.</p>
              </div>
            ) : (
              itemsToShow.map((media) => (
                <Col key={media.Key} sm="4" md="2" lg="2" xl={2} className='text-center mb-2'>
                  <FileLibrary
                    image={media}
                    loading={loadingOnDelete}
                    setLoading={setLoadingOnDelete}
                    onDelete={onDelete}
                    handleSaveFileName={handleSaveFileName}
                    loadingEdit={loadingOnEdit}
                  />
                </Col>
              ))
            )
          )}
        </Row>
      </CardBody>
      <CardFooter>
        <Pagination>
          {paginationItems}
        </Pagination>
      </CardFooter>
    </Card>
  )
}

export default MediaLibraryView
