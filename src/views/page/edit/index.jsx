// ** Invoice Add Components
// import EditCard from './EditCard'
import EditActions from "./EditActions"

// ** Reactstrap Imports
import { Row, Col, Form } from "reactstrap"
import { toast } from "react-toastify"
// ** Styles
// import "@styles/react/libs/flatpickr/flatpickr.scss"
// import "@styles/base/pages/app-invoice.scss"
import slugify from "react-slugify"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import htmlToDraft from "html-to-draftjs"
import { ContentState, EditorState } from "draft-js"
import AddCard from "../add/AddCard"
import { stateToHTML } from "draft-js-export-html"
import Cover from "../cover"
import { useDeleteFile, useUploadFile } from "../../../utility/hooks/useFiles"
import PublishedCard from "../cover/PublishedCard"
import useFetch from "../../hooks/useFetch"

const PageEdit = (props) => {
  const { state } = props.location

  const [language, setLanguage] = useState(state.language)
  const [title, setTitle] = useState(state.title)
  const [intro, setIntro] = useState(state.intro)
  const contentBlock = htmlToDraft(state.content)
  const [published, setPublished] = useState(state.published)

  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )
  const editorState = EditorState.createWithContent(contentState)
  const [content, setContent] = useState(editorState)
  const [image, setImage] = useState({
    file: null,
    response: null
  })
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { put } = useFetch()

  const updateWithouImage = () => {
    const data = {
      id: state.id,
      title,
      intro,
      image: state.image,
      slug: slugify(title),
      content: stateToHTML(content.getCurrentContent()),
      url: `/${slugify(title)}`,
      language,
      published
    }
    put(`/page/${state.id}`, JSON.stringify(data)).then((res) => {
      if (res.status === 200) {
        toast.success("Page updated succesfully !")
        history.push("/page/list")
      }
    })
  }
  const updatePage = (image) => {
    const data = {
      id: state.id,
      title,
      intro,
      slug: slugify(title),
      content: stateToHTML(content.getCurrentContent()),
      image: image.key,
      url: `/${slugify(title)}`,
      published,
      language
    }

    put(`/page/${state.id}`, JSON.stringify(data)).then((res) => {
      if (res.status === 200) {
        toast.success("Page updated succesfully !")
        history.push("/page/list")
      }
    })
  }
  const uploadCover = () => {
    useUploadFile(image.file, updatePage)
  }
  const deleteCover = () => {
    useDeleteFile(state.image, uploadCover)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (image.file) {
      deleteCover()
    } else if (state.image) {
      updateWithouImage()
    } else {
      toast.error("Please select a cover for the page")
    }
  }
  return (
    <div className="invoice-add-wrapper">
      <Form onSubmit={(e) => onHandleSubmit(e)}>
        <Row className="invoice-add">
          <Col xl={9} md={8} sm={12}>
            <AddCard
              language={language}
              setLanguage={setLanguage}
              title={title}
              intro={intro}
              content={content}
              setTitle={setTitle}
              setIntro={setIntro}
              setContent={setContent}
              loading={loading}
            />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <Cover
              setCover={setImage}
              cover={image}
              currentImage={state.image}
            />
            <PublishedCard setPublished={setPublished} published={published} />
            <EditActions />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PageEdit
