// ** React Imports
// import { Fragment, useState } from "react"
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from "reactstrap"

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  Shield,
  Lock,
  Unlock,
  StopCircle
} from "react-feather"

// import DeleteModal from "./DeleteModal"
import { IKImage } from "imagekitio-react"
import DeleteModal from "./DeleteModal"
import { useState } from "react"

// ** Vars

// ** renders client column

// ** Table columns
export const columns = [
  {
    name: "Content",
    nameKey: "content",
    sortable: false,
    maxWidth: "80%",
    minWidth: "70%",
    sortField: "content",
    // selector: row => row.views,
    cell: (row) => <span className="pl-2">{row?.content.substring(0, 50)}</span>
  },

  {
    name: "Actions",
    nameKey: "actions",
    minWidth: "20%",
    cell: (row) => {
      const [modal, setModal] = useState(false)
      return (
        <div className="column-action d-flex align-items-center">
          <Link
            to={{ pathname: `/comments/preview/${row.id}`, state: row }}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          
          <span onClick={() => setModal(true)} style={{ cursor: "pointer" }}>
            <Trash size={17} className="mx-1" />
          </span>
          <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
            Preview Post
          </UncontrolledTooltip>

          <DeleteModal modal={modal} setModal={setModal} row={row} />
        </div>
      )
    }
  }
]
