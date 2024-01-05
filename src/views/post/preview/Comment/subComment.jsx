import React, { useState } from "react"
import PropTypes from "prop-types"
import "./comment.sass"
import { formatDate } from "../../../../utility/Utils"
import Avatar from '@components/avatar'
import { IKImage } from "imagekitio-react"
import { useTranslation } from "react-i18next"
import useFetch from "../../../hooks/useFetch"
import { Spinner } from "reactstrap"


const SubComment = ({ item }) => {

  const { t } = useTranslation()
  const { put } = useFetch()
  const [isBlocked, setIsBlocked] = useState(item.blocked)
  const [loadingBlockItemId, setLoadingBlockItemId] = useState(null)

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
    </div>
  )
}

SubComment.propTypes = {
  item: PropTypes.instanceOf(Object)
}
SubComment.defaultProps = {
  item: null
}

export { SubComment }
