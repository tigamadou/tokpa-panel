// ** React Imports
import { useParams, Link } from "react-router-dom"

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap"

// ** Invoice Preview Components
import PreviewCard from "./PreviewCard"
import PreviewActions from "./PreviewActions"

// ** Styles
import "@styles/base/pages/app-invoice.scss"

const PagePreview = ({ location }) => {
  // ** HooksVars
  const { id } = useParams()
  const { state } = location
  // ** States

  return state !== null && state !== undefined ? (
    <div className="invoice-preview-wrapper">
      <Row className="invoice-preview">
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={state} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} state={state} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Invoice not found</h4>
      <div className="alert-body">
        Page with id: {id} doesn't exist. Check list of all page:
        <Link to="/page/list">Page List</Link>
      </div>
    </Alert>
  )
}

export default PagePreview
