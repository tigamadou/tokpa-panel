// ** Reactstrap Imports
import { Card, CardBody, List } from "reactstrap"
import { useTranslation } from 'react-i18next'

const PreviewCard = ({ data }) => {
  const { t } = useTranslation()

  return data !== null ? (
    <Card>
      <CardBody className="invoice-padding pb-0">
        {/* Header */}
        <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
          <div className="mt-md-0 mt-2">
            <h4>{t('table.datetime')}: {data.datetime}</h4>
          </div>
        </div>
        <List type="unstyled">
          <li><strong>Message : </strong>{data.message.message}</li>
          <li><strong>{t('table.ipaddress')} : </strong>{data.ip}</li>
          <li><strong>{t('table.browser')} : </strong>{data.browser}</li>
          <li><strong>{t('table.os')} : </strong>{data.platform}</li>
        </List>
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
