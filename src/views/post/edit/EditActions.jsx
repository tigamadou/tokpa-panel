// ** React Imports
import { Fragment } from "react"
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from "reactstrap"
import { useTranslation } from "react-i18next"

const EditActions = ({ onHandleSubmit }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Card className="invoice-action-wrapper">
        <CardBody>
          <Button
            onClick={(e) => onHandleSubmit(e, "save")}
            color="success"
            block
            className="mb-75"
          >
            {t("buttons.save")}
          </Button>
          <Button
            onClick={(e) => onHandleSubmit(e, "draft")}
            color="light"
            block
            className="mb-75"
          >
            {t("buttons.save_to_draft")}
          </Button>
          <Button
            onClick={(e) => onHandleSubmit(e, "trash")}
            color="primary"
            block
            className="mb-75"
          >
            {t("buttons.save_to_trash")}
          </Button>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default EditActions
