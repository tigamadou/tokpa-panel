import React, { useEffect, useRef, useState } from "react"
import useFetch from "../../../hooks/useFetch"
import { toast } from "react-toastify"
import { Spinner } from "reactstrap"
import { useTranslation } from 'react-i18next'
// import { IKImage } from "imagekitio-react"
// import { formatDate } from "../../../../utility/Utils"
import { Comment } from "./comment"
import { useOnScreen } from "../../../../utility/hooks/useOnScreen"

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const { get: getCommentList } = useFetch()
  const { t } = useTranslation()
  const ref = useRef(null)
  const isCommentSectionVisible = useOnScreen(ref)

  useEffect(() => {
    if (isCommentSectionVisible && comments.length === 0) {
    setLoading(true)
    getCommentList(`/comments/post/${postId}`)
      .then((response) => {
        setLoading(false)
        setComments(response)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        toast.error("Erreur lors de la récupération des commentaires")
      })
    }
  }, [postId, isCommentSectionVisible])

  return (
    <div ref={ref}>
      <h2>{t('title.comments')}</h2>
      {!loading ? (
        comments.map((comment) => (
          <Comment item={comment} key={comment.id} />
        ))
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center my-2">
          <Spinner
            size="lg"
            className="me-25 my-2 text-primary"
            style={{ height: "40px", width: "40px" }}
          />
          <span>{t('messages.fetching_comments_data')}</span>
        </div>
      )}
    </div>
  )
}

export default CommentList
