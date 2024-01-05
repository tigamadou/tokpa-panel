import React from "react"
import { Card, CardBody, Input } from "reactstrap"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

export default function PublishedCard({ setPublished, published }) {
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.userData)
  console.log(user)
  return (
    <Card>
      <CardBody>
        {t("title.publish_post")}
        <span className="float-end">
          <Input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={user.role !== "Administrator"}
          />
        </span>
      </CardBody>
    </Card>
  )
}
