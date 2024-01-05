// ** Reactstrap Imports
import { IKImage } from "imagekitio-react"
import { Card, CardBody, CardText, Row, Col, Table, Badge } from "reactstrap"

const PreviewCard = ({ data }) => {
  return data !== null ? (
    <Card>
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <div className="">
          <div className="mt-md-0 mt-2">
            <h4>Commentaire sur le post {data?.postId}</h4>
              <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
            <div>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
