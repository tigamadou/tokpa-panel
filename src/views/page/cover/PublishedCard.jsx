import React from "react"
import { Card, CardBody, Input } from "reactstrap"

export default function PublishedCard({ setPublished, published }) {
  return (
    <Card>
      <CardBody>
        Publish page
        <span className="float-end">
          <Input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </span>
      </CardBody>
    </Card>
  )
}
