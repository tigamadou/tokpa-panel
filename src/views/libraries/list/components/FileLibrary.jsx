import React, { useState } from 'react'
import './image.sass'
import { Button, Spinner } from 'reactstrap'
import Sidebar from '@components/sidebar'
import { extractFileNameFromPath, formatFileSize, getFileType } from '../../../../utility/Utils'
import { Copy, Trash, Video, Music, FileText, Edit2 } from 'react-feather'
import { toast } from "react-toastify"
import moment from 'moment'
import { EditableInput } from './editFilename'

const FileLibrary = ({ image, onDelete, loading, setLoading, handleSaveFileName, loadingEdit }) => {
  // console.log(image)
  const formattedLastModified = moment(image.LastModified).format('MMM D YYYY, h:mm A')
  const thumbnailUrl = `${process.env.REACT_APP_IMAGEKIT_ENDPOINT}tr:w-110,h-110/${image.Key}`
  const ImageUrl = `${process.env.REACT_APP_IMAGEKIT_ENDPOINT}/tr:w-200/${image.Key}`
  const [imageLoaded, setImageLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fileType = getFileType(image.Key)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const onCopyLink = () => {
    navigator.clipboard.writeText(ImageUrl)
    toast.success("Copy link successfully")
  }

  const onClosed = () => {
    setLoading(false)
    setSidebarOpen(false)
  }

  return (
    <>
      {fileType === "image" && (
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
            src={`${thumbnailUrl}`}
            className={`thumbnail-image ${imageLoaded ? 'loaded' : ''}`}
            alt=""
            onLoad={handleImageLoad}
            onClick={toggleSidebar}

          />
        </div>
      )}
      {fileType === "video" && (
        <div className='thumbnail-wrapper'>
          <Video size={100}
            className='thumbnail-image'
            onClick={toggleSidebar}
          />
          <div style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></div>
        </div>
      )}
      {fileType === "music" && (
        <div
          className='thumbnail-wrapper'>
          <Music size={100}
            className='thumbnail-image'
            onClick={toggleSidebar}
          />
          <p style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></p>
        </div>
      )}
      {fileType === "other" && (
        <div
          className='thumbnail-wrapper'>
          <FileText size={100}
            className='thumbnail-image'
            onClick={toggleSidebar}
          />
          <p style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></p>
        </div>
      )}
      <Sidebar
        size='sm'
        open={sidebarOpen}
        title="Détails"
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
        onClosed={onClosed}

      >
        {fileType === "image" && (
          <img
            src={`${ImageUrl}`}
            alt=""
            onLoad={handleImageLoad}

          />)}
        {fileType === "video" && (
          <div className='thumbnail-wrapper'>
            <Video size={100} />
            <p style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></p>
          </div>
        )}
        {fileType === "music" && (
          <div
            className='thumbnail-wrapper'>
            <Music size={100} />
            <p style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></p>
          </div>
        )}
        {fileType === "other" && (
          <div
            className='thumbnail-wrapper'>
            <FileText size={100} />
            <p style={{ fontSize: '10px' }}><strong>{extractFileNameFromPath(image.Key)}</strong></p>
          </div>
        )}
        <div className='my-5'>
          <p><strong>Size: </strong>{formatFileSize(image.Size)}</p>
          <EditableInput
            initialValue={extractFileNameFromPath(image.Key)}
            onSave={handleSaveFileName}
            loading={loadingEdit} />
          <p><strong>Last modified: </strong>{formattedLastModified}</p>
          <p>
            <strong>Lien: </strong>
            <a href={ImageUrl} target="_blank" style={{ color: 'blue' }}>{ImageUrl}</a>
            <Button
              color="none"
              onClick={() => onCopyLink(image)}
              size='sm'>
              <Copy />
            </Button></p>
          <p className="text-danger">
            Attention : La suppression est irréversible.
            {loading ? (
              <><br />
                <Spinner
                  size="lg"
                  className="my-2 text-primary"
                  style={{ height: "25px", width: "25px" }}
                />
              </>
            ) : (
              <Button
                color="danger"
                onClick={() => onDelete(image.Key)}
                size='sm'>
                <Trash /> Supprimer
              </Button>
            )}


          </p>
        </div>
      </Sidebar>
    </>
  )
}

export { FileLibrary }
