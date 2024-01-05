// ** React Imports
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from "reactstrap"

const Cover = ({ setCover, cover, currentImage = null, action }) => {
  const { t } = useTranslation()
  const [image, setImage] = useState(null)
  const [changeImage, setchangeImage] = useState(false)
  const [changeButtonText, setChangeButtonText] = useState("Change Cover")
  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    setCover({ ...cover, file: e.target.files[0] })
  }
  const handleChangeImage = () => {
    setchangeImage(!changeImage)
    if (changeButtonText === "Change Cover") {
      setChangeButtonText("Hide")
    } else {
      setChangeButtonText("Change Cover")
    }
  }
  return (
    <Fragment>
      <Card>
        <CardBody>
          {currentImage && !image ? (
            !changeImage && (
              <img
                src={`${process.env.REACT_APP_IMAGEKIT_ENDPOINT}${currentImage}`}
                alt=""
              />
            )
          ) : (
            <>{image && changeImage && <img src={image} alt="" />}</>
          )}
          {t('title.cover_image')}
          {currentImage && !changeImage ? null : (
            <Input
              type="file"
              onChange={handleFileChange}
              name="cover"
              required
            />
          )}
          <div>
            {action !== "add" && (
              <Button
                type="button"
                color="primary"
                className="my-1 float-end"
                onClick={() => {
                  handleChangeImage()
                }}
              >
                {changeButtonText}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Cover
