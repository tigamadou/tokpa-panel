// ** React Imports
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"
import { getPosts } from "../store"
import useFetch from "../../hooks/useFetch"

const PreviewActions = ({ id, state }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    if (confirm(t('messages.confirm_delete'))) {
      destroy(`/post/${id}`).then(() => {
        get("/post/").then((res) => {
          if (res) {
            dispatch(
              getPosts({
                allData: res,
                total: res.length
              })
            )
          }
          toast.error(t('messages.post_deleted'))
          history.push("/post/list")
        })
      })
    }
  }
  return (
    <Card className="invoice-action-wrapper">
      <CardBody>
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
          to={{ pathname: `/post/edit/${id}`, state }}
          color="secondary"
          block
          outline
          className="mb-75"
        >
          {t('actions.edit')}
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
