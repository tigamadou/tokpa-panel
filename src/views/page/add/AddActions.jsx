// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Spinner } from 'reactstrap'

const AddActions = ({loading}) => {
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button type='submit' color='primary' block className='mb-75' disabled={loading}>
            <span>Save</span>
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
