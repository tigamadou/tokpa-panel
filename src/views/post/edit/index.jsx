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
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import htmlToDraft from "html-to-draftjs"
import { ContentState, EditorState } from "draft-js"
import AddCard from "../add/AddCard"
import { stateToHTML } from "draft-js-export-html"
import CoverImage from "../cover/selectImage"
import PublishedCard from "../cover/PublishedCard"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from "react-i18next"
import VideoLink from "../add/VideoLink"
import AudioPlayer from "../add/Audio"

const PostEdit = (props) => {
  const { t } = useTranslation()
  const { state } = props.location

  const [category, setCategory] = useState(state.category)
  const [title, setTitle] = useState(state.title)
  const [intro, setIntro] = useState(state.intro)
  const [language, setLanguage] = useState(state.language)
  const contentBlock = htmlToDraft(state.content)
  const [published, setPublished] = useState(state.published)
  const [coverImage, setCoverImage] = useState(state.image)
  const [audioLink, setAudioLink] = useState(state.audio)
  const [videoLink, setVideoLink] = useState(state.video)

  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  )
  const editorState = EditorState.createWithContent(contentState)
  const [content, setContent] = useState(editorState)
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.auth.userData)
  const history = useHistory()
  const { put } = useFetch()

  const updatePost = (status) => {
    const data = {
      id: state.id,
      title,
      intro,
      image: coverImage,
      slug: slugify(title),
      language,
      content: stateToHTML(content.getCurrentContent()),
      url: `${category.slug}/${slugify(title)}`,
      category,
      author: user,
      published,
      video: videoLink,
      audio: audioLink,
      status
    }
    put(`/post/${state.id}`, JSON.stringify(data)).then((res) => {
      if (res.status === 200) {
        toast.success(t("messages.post_updated_successfully"))
        history.push("/post/list")
      }
    })
  }

  const onHandleSubmit = (e, status) => {
    e.preventDefault()
    setLoading(true)
    if (status === "save") {
      if (coverImage) {
        updatePost("save")
      } else {
        toast.error(t("messages.please_select_cover"))
      }
    }
    if (status === "draft") {
      if (coverImage) {
        updatePost("draft")
      } else {
        toast.error(t("messages.please_select_cover"))
      }
    }
    if (status === "trash") {
      if (coverImage) {
        updatePost("trash")
      } else {
        toast.error(t("messages.please_select_cover"))
      }
    }
  }
  return (
    <div className="invoice-add-wrapper">
      <Form onSubmit={(e) => onHandleSubmit(e, "save")}>
        <Row className="invoice-add">
          <Col xl={9} md={8} sm={12}>
            <AddCard
              category={category}
              setCategory={setCategory}
              title={title}
              intro={intro}
              content={content}
              setTitle={setTitle}
              setIntro={setIntro}
              setContent={setContent}
              loading={loading}
              setLang={setLanguage}
              lang={language}
            />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <CoverImage setCoverLink={setCoverImage} coverLink={coverImage} />
            <PublishedCard setPublished={setPublished} published={published} />
            <VideoLink
              videoLink={videoLink}
              setVideoLink={setVideoLink}
              loading={loading}
            />
            <AudioPlayer audioLink={audioLink} setAudioLink={setAudioLink} />
            <EditActions onHandleSubmit={onHandleSubmit} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PostEdit
