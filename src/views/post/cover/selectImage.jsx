// ** React Imports
import { Fragment, useEffect, useState } from "react"
// import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { useSelector } from "react-redux"
import './style.sass'
// ** Reactstrap Imports
import { Card, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Row, Col } from "reactstrap"
import { listObjects } from "../../../utility/hooks/useFiles"

import { AlertCircle } from 'react-feather'

const CoverImage = ({ setCoverLink, coverLink }) => {
  const { t } = useTranslation()

  const userInfo = useSelector((state) => state.auth.userData)
  const [showModal, setShowModal] = useState(false)
  const [userWorkspace, setUserWorkspace] = useState(null)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp', '.webp']
  const [coverSelected, setCoverSelected] = useState(false)

  useEffect(() => {
    setUserWorkspace(`user_${userInfo.userId}`)
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const getImages = (objects) => {
    return objects.filter((object) => {
      const fileExtension = object.Key.split('.').pop().toLowerCase()
      return imageExtensions.includes(`.${fileExtension}`)
    })
  }

  const getUserFiles = () => {
    setLoading(true)
    listObjects(userWorkspace, (result) => {
      if (result === false) {
        setLoading(false)
        console.error('Erreur lors de la récupération des objets.')
      } else {
        setLoading(false)
        const imagesList = getImages(result)
        setImages(imagesList)
      }
    })
  }
  
  const toogleModal = () => {
    getUserFiles()
    setShowModal(true)
  }

  const selectImage = (image) => {
      setCoverSelected(image === coverLink ? null : image) 
  }

  const save = () => {
    setShowModal(false)
    setCoverLink(coverSelected)
  }

  return (
    <Fragment>
      <Card>
        <div>
          {coverLink && (
            <img
              src={`${process.env.REACT_APP_IMAGEKIT_ENDPOINT}/tr:w-450/${coverLink}`}
              alt=""
              onLoad={handleImageLoad}
            />
          )}
        </div>
          {coverLink && !imageLoaded && (
            <div className="d-flex flex-column align-items-center justify-content-center my-2">
              <Spinner
                size="lg"
                className="my-2 text-primary"
                style={{ height: "25px", width: "25px" }}
              />
              <span>Loading...</span>
            </div>
          )}
          <CardFooter>
            {t('title.cover_image')}
            <Button
              color='primary'
              block
              className='mb-75'
              onClick={toogleModal}
            >
              <span>{t('buttons.choose')}</span>
            </Button>
          </CardFooter>
      </Card>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        className='modal-dialog modal-lg'
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>{t('fields.select_cover')}</ModalHeader>
        <ModalBody className=''>
          <div className="files-tiles">
            {loading &&
              <div className="d-flex flex-column align-items-center justify-content-center my-2">
                <Spinner color="primary" size={'md'} />
              </div>
            }
            {!loading && images.length === 0 &&
              <div className="d-flex flex-column align-items-center justify-content-center my-2">
                <AlertCircle size={48} color="red" />
                <p>Aucun élément trouvé.</p>
              </div>
            }
            <Row>
              {!loading && images && images.map((image) => (
                <Col key={image.Key} sm="7" md="5" lg="3" className='text-center mb-2'>
                  <div className='thumbnail-wrapper'>
                    {!imageLoaded && (
                      <div className="d-flex flex-column align-items-center justify-content-center my-2">
                        <Spinner
                          size="lg"
                          className="my-2 text-primary"
                          style={{ height: "25px", width: "25px" }}
                        />
                        <span>Loading...</span>
                      </div>
                    )}
                    <img
                      src={`${process.env.REACT_APP_IMAGEKIT_ENDPOINT}tr:w-100,h-100/${image.Key}`}
                      className={`thumbnail-image ${imageLoaded ? 'loaded' : ''} ${(coverSelected && coverSelected === image.Key) ? 'selected' : ''}`}
                      style={{ cursor: "pointer" }}
                      alt=""
                      onLoad={handleImageLoad}
                      onClick={() => selectImage(image.Key)}
                    />
                  </div>
                </Col>
              ))}
              

            </Row>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            className='mb-75'
            disabled={!coverSelected}
            onClick={save}
          >
            <span>{t('buttons.save')}</span>
          </Button>
        </ModalFooter>

      </Modal>
    </Fragment>
  )
}

export default CoverImage
