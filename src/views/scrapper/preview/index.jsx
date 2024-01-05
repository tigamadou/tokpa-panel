// ** React Imports
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'
import { useTranslation } from 'react-i18next'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// ** Styles
import '@styles/base/pages/app-invoice.scss'


const ScrapperPreview = ({ location }) => {
  // ** HooksVars
  const { id } = useParams()
  const { t } = useTranslation()

  const { state } = location
  // ** States

  return state !== null && state !== undefined ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={state} />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <PreviewActions id={id} state={state} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>{t('messages.post_not_found')}</h4>
      <div className='alert-body'>
      {t('messages.post_not_exist', { id })} {" "}
        <Link className='text-decoration-underline' to='/scrapper/list'>{t('title.post_list')}</Link>
      </div>
    </Alert>
  )
}

export default ScrapperPreview
