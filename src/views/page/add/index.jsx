/* eslint-disable no-unused-vars */
// ** Invoice Add Components
import AddCard from "./AddCard"
import AddActions from "./AddActions"
import Cover from "../cover"

// ** Reactstrap Imports
import { Row, Col, Form, Spinner } from "reactstrap"
import { toast } from "react-toastify"
// ** Styles
// import "@styles/react/libs/flatpickr/flatpickr.scss"
// import "@styles/base/pages/app-invoice.scss"
import slugify from "react-slugify"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { EditorState } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { useUploadFile } from "../../../utility/hooks/useFiles"
import PublishedCard from "../cover/PublishedCard"
import useFetch from "../../hooks/useFetch"

const PageAdd = () => {
  const [language, setLanguage] = useState("")
  const [title, setTitle] = useState("")
  const [intro, setIntro] = useState("")
  const [content, setContent] = useState(EditorState.createEmpty())
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState({
    file: null,
    response: null
  })
  const [published, setPublished] = useState(false)
  const [deleted] = useState(false)
  const [views] = useState(0)

  const { post } = useFetch()
  const history = useHistory()

  const createPage = (image) => {
    const data = {
      title,
      intro,
      slug: slugify(title),
      content: stateToHTML(content.getCurrentContent()),
      image: image.key,

      url: `/${slugify(title)}`,
      published,
      deleted,
      views,
      language
    }

    post("/page/", JSON.stringify(data)).then((res) => {
      if (res.status === 201) {
        toast.success("Page added succesfully !")
        history.push("/Page/list")
      }
    })

    setLoading(false)
  }

  const uploadCover = () => {
    useUploadFile(image.file, createPage)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    if (image.file) {
      uploadCover()
    } else {
      toast.error("Please select a cover for the Page")
    }
  }

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
    <div className="invoice-add-wrapper">
      <Form onSubmit={(e) => onHandleSubmit(e)}>
        <Row className="invoice-add">
          <Col xl={9} md={8} sm={12}>
            <AddCard
              title={title}
              intro={intro}
              content={content}
              setTitle={setTitle}
              setIntro={setIntro}
              setContent={setContent}
              loading={loading}
              language={language}
              setLanguage={setLanguage}
            />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <Cover setCover={setImage} cover={image} action="add" />
            <PublishedCard setPublished={setPublished} published={published} />
            <AddActions loading={loading} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PageAdd
