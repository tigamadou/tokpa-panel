// ** React Imports
import { Fragment, useState } from "react"
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
  ArrowDownCircle
} from "react-feather"

import DeleteModal from "./DeleteModal"
import { IKImage } from "imagekitio-react"
import UpdateModal from "./UpdateModal"

// ** Vars

// ** renders client column

// ** Table columns
export const columns = [
  {
    name: "Name",
    nameKey: "name",
    sortable: false,
    minWidth: "60%",
    // sortField: "client.name",
    // selector: row => row.client.name,
    cell: (row) => {
      const title = row.name ? row.name : ""
      return <span className="user-name text-truncate mb-0">{title}</span>
    }
  },
  {
    name: "Language",
    nameKey: "language",
    sortable: false,
    maxWidth: "50px",
    sortField: "language",
    // selector: row => row.views,
    cell: (row) => <span className="pl-2">{row.language || "inconnu"}</span>
  },
  {
    name: "Color",
    nameKey: "color",
    sortable: false,
    maxWidth: "200px",
    sortField: "views",
    cell: (row) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: row.color || "transparent",
            width: "20px",
            height: "20px"
          }}
        ></div>
        <span className="pl-2">{row.color || ""}</span>
      </div>
    )
  },
  {
    name: "Action",
    nameKey: "actions",
    minWidth: "20%",
    cell: (row) => {
      const [modal, setModal] = useState(false)
      const [modalEdit, setModalEdit] = useState(false)
      return (
        <div className="column-action d-flex align-items-center">
          <span
            onClick={() => setModalEdit(true)}
            style={{ cursor: "pointer" }}
          >
            <Edit size={17} className="mx-1" />
          </span>
          <span onClick={() => setModal(true)} style={{ cursor: "pointer" }}>
            <Trash size={17} className="mx-1" />
          </span>

          <DeleteModal modal={modal} setModal={setModal} row={row} />
          <UpdateModal modal={modalEdit} setModal={setModalEdit} row={row} />
        </div>
      )
    }
  }
]
