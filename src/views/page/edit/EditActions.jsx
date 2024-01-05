// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button, Input } from 'reactstrap'

const EditActions = () => {
  return (
    <Fragment>
      <Card className='invoice-action-wrapper'>
        <CardBody>
          <Button type='submit' color='primary' block className='mb-75'>
            Save
          </Button>
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default EditActions
