/* eslint-disable no-unused-vars */
// ** Invoice Add Components
import AddCard from "./AddCard"
import AddActions from "./AddActions"
import AudioPlayer from './Audio'
import CoverImage from '../cover/selectImage'
import VideoLink from './VideoLink'

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
import { useTranslation } from "react-i18next"

const PostAdd = () => {
  const [category, setCategory] = useState({})
  const [language, setLanguage] = useState("")
  const [title, setTitle] = useState("")
  const [intro, setIntro] = useState("")
  const [content, setContent] = useState(EditorState.createEmpty())
  const [loading, setLoading] = useState(false)
  const [coverImage, setCoverImage] = useState(null)
  const [audioLink, setAudioLink] = useState("")
  const [videoLink, setVideoLink] = useState("")
  const [image, setImage] = useState({
    file: null,
    response: null
  })
  const [published, setPublished] = useState(false)
  const [deleted] = useState(false)
  const [views] = useState(0)

  const { t } = useTranslation()

  const user = useSelector((state) => state.auth.userData)
  const { post } = useFetch()
  const history = useHistory()

  const createPost = () => {
    const data = {
      title,
      intro,
      slug: slugify(title),
      content: stateToHTML(content.getCurrentContent()),
      image: coverImage,
      language,

      url: `${category.slug}/${slugify(title)}`,
      published,
      deleted,
      views,
      category,
      video: videoLink,
      audio: audioLink
    }

    post("/post/", JSON.stringify(data)).then((res) => {
      if (res.status === 201) {
        toast.success(t("messages.post_added_successfully"))
        history.push("/post/list")
      }
    })

    setLoading(false)
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(category).length === 0) {
      toast.error(t("messages.please_add_category"))
    } else {
      setLoading(true)
      if (coverImage) {
        createPost()
      } else {
        toast.error(t("messages.please_select_cover"))
      }
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
              setCategory={setCategory}
              title={title}
              intro={intro}
              content={content}
              setTitle={setTitle}
              setIntro={setIntro}
              setContent={setContent}
              audioLink={audioLink}
              setAudioLink={setAudioLink}
              loading={loading}
              setLang={setLanguage}
              lang={language}
            />
          </Col>
          <Col xl={3} md={4} sm={12}>
            <CoverImage setCoverLink={setCoverImage} coverLink={coverImage} />
            <VideoLink videoLink={videoLink} setVideoLink={setVideoLink} loading={loading}/>
            <AudioPlayer audioLink={audioLink} setAudioLink={setAudioLink}/>
            <PublishedCard setPublished={setPublished} published={published} />
            <AddActions loading={loading} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default PostAdd
