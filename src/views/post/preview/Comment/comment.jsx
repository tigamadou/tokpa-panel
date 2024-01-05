import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "./comment.sass"
import axios from "axios"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"
import { formatDate } from "../../../../utility/Utils"
import { SubComment } from "./subComment"
import { IKImage } from "imagekitio-react"
import Avatar from '@components/avatar'
import useFetch from "../../../hooks/useFetch"

const Comment = ({ item }) => {
  const [subComments, setSubComments] = useState([])
  const { t } = useTranslation()
  const [position, setPosition] = useState(0)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingBlockItemId, setLoadingBlockItemId] = useState(null)
  const { put } = useFetch()
  const [isBlocked, setIsBlocked] = useState(item.blocked)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/comments/subcomments/${item.id}?position=${position}`)
      .then((res) => {
        setSubComments(res.data)
        setLoading(false)
      })
  }, [item])

  const loadMoreComments = async () => {
    setLoading(true)
    await axios
      .get(`/comments/subcomments/${item.id}?position=${position}`)
      .then((res) => {
        setLoading(false)
        setSubComments([...subComments, ...res.data])
        setPosition((prevState) => prevState + res.data.length)
        if (res.data.length === 0) {
          setHasMoreData(false)
        }
      })
  }

  const hideOrShow = async (comment_id) => {
    setLoadingBlockItemId(comment_id)
    await put(`/comments/block/${comment_id}`)
    setIsBlocked(!isBlocked)
    setLoadingBlockItemId(null)
  }

  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  return (
    <div className="comment-wrapper">
      <div className="comment">
        {item.avatar ? (
          <IKImage
            className="rounded-circle shadow-1-strong me-1"
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_ENDPOINT}
            path={item.avatar}
            style={{ objectFit: 'cover', height: '40px', width: '40px' }}
          />
        ) : (
          <Avatar
            color={color || 'primary'}
            className='me-1 center-comments'
            content={`${item.user}` || 'John Doe'}
            initials
            
          />
        )}
        <div className="comment-wrapper">
          <div className="comment-details">
            <div className="comment-author">{item.user}</div>
            <div className="comment-content">{item.content}</div>
          </div>
          <div className="comment-footer">
            <div className="comment-footer-date">
              {formatDate(item.updatedDate)}
            </div>
            <div
              onClick={() => hideOrShow(item.id)}
              className={`comment-reply ${isBlocked ? 'text-success' : 'text-danger'}`}
            >
              {loadingBlockItemId === item.id ? (
                <Spinner
                  size="sm"
                  className="me-25 text-primary"
                  style={{ height: "10px", width: "10px", marginLeft: '50px' }}
                />
              ) : (
                isBlocked ? (t("buttons.show_comment")) : (t("buttons.hide_comment"))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="reply">
        {subComments.map((comment, index) => (
          <SubComment key={index} item={comment} hideOrShow={hideOrShow} />
        ))}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {loading && (
            <Spinner
              size="lg"
              className="me-25 text-primary"
              style={{ height: "20px", width: "20px", marginLeft: '50px' }}
            />
          )}
        </div>
        {subComments && subComments.length > 0 && (
          <Button
            style={{ margin: '10px 0', marginLeft: '50px', fontSize: '10px', width: 'auto' }}
            disabled={!hasMoreData}
            size="sm"
            onClick={loadMoreComments}
            color="link"
          >

            {t("buttons.load_more_response")}
          </Button>
        )}
      </div>
    </div>
  )
}

Comment.propTypes = {
  item: PropTypes.instanceOf(Object)
}
Comment.defaultProps = {
  item: null
}

export { Comment }
