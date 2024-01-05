// ** React Imports
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"
import { getScrappers } from "../store"
import useFetch from "../../hooks/useFetch"

const PreviewActions = ({ id }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    if (confirm(t('messages.confirm_delete'))) {
      destroy(`/scrapper/${id}`).then(() => {
        get("/scrapper/").then((res) => {
          if (res) {
            dispatch(
              getScrappers({
                allData: res,
                total: res.length
              })
            )
          }
          toast.error(t('messages.post_deleted'))
          history.push("/scrapper/list")
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
       
      </CardBody>
    </Card>
  )
}

export default PreviewActions
