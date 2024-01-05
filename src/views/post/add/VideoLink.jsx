import React from "react"
import { Card, CardBody, Input, Label } from "reactstrap"
import { useTranslation } from 'react-i18next'

export default function VideoLink({ setVideoLink, videoLink, loading }) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardBody>
        <div className="mb-1">
          <Label>{t("fields.video_link")}</Label>
          <Input
            type="text"
            name="VideoLink"
            onChange={(e) => setVideoLink(e.target.value)}
            value={videoLink}
            disabled={loading}
          />
        </div>
      </CardBody>
    </Card>
  )
}
