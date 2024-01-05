// ** React Imports
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"
import { getComments } from "../store"
import useFetch from "../../hooks/useFetch"

const PreviewActions = ({ id, data }) => {
  console.log("data ", data)
  
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const { destroy, get, put } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    if (confirm(t('messages.confirm_delete'))) {
      destroy(`/comments/${id}`)
        .then(() => {
          get("/comments/").then((res) => {
            if (res) {
              dispatch(
                getComments({
                  allData: res,
                  total: res.length
                })
              )
            }
            toast.error(t('messages.comment_deleted'))
            history.push("/comments/list")
          })
        })
    }
  }

  const onBlockComment = (e) => {
    e.preventDefault()
    if (confirm(t('messages.confirm_block_comment'))) {
      put(`/comments/block/${id}`)
        .then(() => {
          get("/comments/").then((res) => {
            if (res) {
              dispatch(
                getComments({
                  allData: res,
                  total: res.length
                })
              )
            }
            toast.error(t('messages.comment_block'))
            history.push("/comments/blocked/list")
          })
        })
    }
  }

  const onUnblockComment = (e) => {
    e.preventDefault()
    if (confirm(t('messages.confirm_unblock_comment'))) {
      put(`/comments/unblock/${id}`)
        .then(() => {
          get("/comments/").then((res) => {
            if (res) {
              dispatch(
                getComments({
                  allData: res,
                  total: res.length
                })
              )
            }
            toast.error(t('messages.comment_unblock'))
            history.push("/comments/list")
          })
        })
    }
  }
  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
        
        {data.blocked ? (<Button
          color="danger"
          tag="a"
          onClick={(e) => onUnblockComment(e)}
          block
          className="mb-75"
        >
          {t('actions.deblocked')}
        </Button>) : (

          <Button
            color="danger"
            tag="a"
            onClick={(e) => onBlockComment(e)}
            block
            className="mb-75"
          >
            {t('actions.blocked')}
          </Button>
        )}
        <Button
          color="danger"
          tag="a"
          onClick={(e) => onHandleDelete(e)}
          block
          className="mb-75"
        >
          {t('actions.delete')}
        </Button>
        <Button
          tag={Link}
          to={{ pathname: `/comments/list` }}
          color="secondary"
          block
          outline
          className="mb-75"
        >
          {t('title.comment_list')}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
