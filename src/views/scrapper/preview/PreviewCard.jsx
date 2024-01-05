// ** Reactstrap Imports
import { IKImage } from "imagekitio-react"
import { Card, CardBody, CardText, Row, Col, Table, Badge } from "reactstrap"

const PreviewCard = ({ data }) => {
  console.log(data.image)
  return data !== null ? (
    <Card>
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
          <div className="mt-md-0 mt-2">
            <h4>{data.title}</h4>
            <div>
              <span className="">
                {data.published ? (
                  <Badge size="small" color="success">
                    Publié
                  </Badge>
                ) : (
                  data.deleted && (
                    <Badge size="small" color="danger">
                      Deleted
                    </Badge>
                  )
                )}
              </span>
            </div>
          </div>
        </div>
        {/* /Header */}
        <p>
          <img src={`${data.image}`} alt={data.title} height={650} />
        </p>
        <p>{data.intro}</p>
        <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
