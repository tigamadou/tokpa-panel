import React, { useState } from 'react'
import { Edit2, Save } from 'react-feather'
import { Button, Input, Spinner } from 'reactstrap'

function EditableInput({ initialValue, onSave, loading }) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const oldName = initialValue

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    onSave(oldName, value)
    setIsEditing(false)
  }

  return (
    <div>
      {loading ? "true" : "false"}
      {isEditing ? (
        <div>
          <Input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={handleSaveClick}
            color='primary'
            size='sm'
          ><Save />
          </Button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '12px' }}><strong>Name: </strong>{value}
            {!loading ? (
              <Button
                color="none"
                onClick={handleEditClick}
                size='sm'>
                <Edit2 className='rounded' />
              </Button>
            ) : (
              <Spinner
                size="sm"
                className="text-primary"
                style={{ height: "15px", width: "15px" }}
              />)}
          </p>
        </div>
      )}
    </div>
  )
}

export { EditableInput }
