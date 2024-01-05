// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Sidebar from './Sidebar'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar) {
    return (
      <Avatar className="me-1" img={row.avatar} imgHeight='32' imgWidth='32' />
    )
  } else {
    return <Avatar color={color || 'primary'} className='me-1' content={`${row.firstname} ${row.lastname}` || 'John Doe'} initials />
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    nameKey: 'user',
    sortable: false,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.firstname,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={{ pathname: `/user/view/${row.id}`, state: row }}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{`${row.firstname} ${row.lastname}`}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Role',
    nameKey: 'role',
    sortable: false,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    name: 'Contacts',
    nameKey: 'contacts',
    minWidth: '230px',
    sortable: false,
    sortField: 'contact',
    selector: row => row.contact,
    cell: row => <span className='text-capitalize'>{row.contact}</span>
  },
  {
    name: 'Status',
    nameKey: 'status',
    minWidth: '138px',
    sortable: false,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Deleted',
    nameKey: 'deleted',
    minWidth: '138px',
    sortable: false,
    sortField: 'deleted',
    selector: row => row.deleted,
    cell: row => (
      <Badge className='text-capitalize' color={row.deleted ? "danger" : "success"} pill>
        {row.deleted ? "yes" : "no"}
      </Badge>
    )
  },
  {
    name: 'Actions',
    nameKey: 'actions',
    minWidth: '100px',
    cell: row => {
      const [sidebarOpen, setSidebarOpen] = useState(false)
      const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
      const [modal, setModal] = useState(false)
      return (
        <div className='column-action'>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className='w-100'
                to={{ pathname: `/user/view/${row.id}`, state: row }}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' className='w-100' onClick={toggleSidebar}>
                <Archive size={14} className='me-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                className='w-100'
                onClick={() => { setModal(!modal) }}
              >
                <Trash2 size={14} className='me-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} user={row} />
          <DeleteModal modal={modal} setModal={setModal} row={row} />
        </div>
      )
    }
  }
]
