// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardBody, Button, Spinner } from 'reactstrap'

const AddActions = ({loading}) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button type='submit' color='primary' block className='mb-75' disabled={loading}>
            <span>{t('buttons.save')}</span>
            {loading && 
              <Spinner color="light" size={'sm'} style={{marginLeft: '8px'}}/>
            }
          </Button>
          
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default AddActions
