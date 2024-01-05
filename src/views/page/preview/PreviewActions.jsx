// ** React Imports
import { useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { toast } from "react-toastify"

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap"
import { getPages } from "../store"
import useFetch from "../../hooks/useFetch"

const PreviewActions = ({ id, state }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { destroy, get } = useFetch()
  const onHandleDelete = (e) => {
    e.preventDefault()
    if (confirm("Do you want to deleted it from database ?")) {
      destroy(`/page/${id}`).then(() => {
        get("/page/").then((res) => {
          if (res) {
            dispatch(
              getPages({
                allData: res,
                total: res.length
              })
            )
          }
          toast.error("Page deleted succesfully !")
          history.push("/page/list")
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
          Delete
        </Button>
        <Button
          tag={Link}
          to={{ pathname: `/page/edit/${id}`, state }}
          color="secondary"
          block
          outline
          className="mb-75"
        >
          Edit
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
