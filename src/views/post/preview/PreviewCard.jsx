// ** Reactstrap Imports
import { IKImage } from "imagekitio-react"
import { Card, CardBody, CardText, Row, Col, Table, Badge } from "reactstrap"
import CommentList from "./Comment/CommentList"

const PreviewCard = ({ data }) => {
  console.log(data)
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
          <IKImage
            urlEndpoint={process.env.REACT_APP_IMAGEKIT_ENDPOINT}
            path={data.image}
            transformation={[
              {
                height: 650,
                width: 1000
              }
            ]}
          />
        </p>
        <p>{data.intro}</p>
        <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
        <CommentList postId={data.id} />
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
