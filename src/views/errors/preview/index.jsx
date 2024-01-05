// ** React Imports
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'
import { useTranslation } from 'react-i18next'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'

// ** Styles
import '@styles/base/pages/app-invoice.scss'


const ErrorPreview = ({ location }) => {
  // ** HooksVars
  const { id } = useParams()
  const { t } = useTranslation()

  const { state } = location
  // ** States

  return state !== null && state !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={12} md={12} sm={12}>
          <PreviewCard data={state} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>{t('messages.error_not_found')}</h4>
      <div className='alert-body'>
        {t('messages.error_not_exist', { id })} {" "}
        <Link className='text-decoration-underline' to='/errors'>{t('title.error_list')}</Link>
      </div>
    </Alert>
  )
}

export default ErrorPreview
