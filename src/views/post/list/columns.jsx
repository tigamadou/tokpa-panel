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

// ** Vars

// ** renders client column

// ** Table columns
export const columns = [
  {
    name: "Cover",
    nameKey: "cover",
    sortable: false,
    minWidth: "80px",
    maxWidth: "150px",
    // sortField: 'client.name',
    // selector: row => row.client.name,
    cell: (row) => {
      const image = row.image ? row.image : ""
      return (
        <IKImage
          urlEndpoint={process.env.REACT_APP_IMAGEKIT_ENDPOINT}
          path={image}
          transformation={[
            {
              height: 39,
              width: 60
            }
          ]}
        />
      )
    }
  },

  {
    name: "Title",
    nameKey: "title",
    sortable: false,
    minWidth: "50%",
    sortField: "client.name",
    // selector: row => row.client.name,
    cell: (row) => {
      const title = row.title ? row.title : ""
      return (
        <Link
          to={{ pathname: `/post/preview/${row.id}`, state: row }}
          id={`pw-tooltip-${row.id}`}
          style={{ color: "#000" }}
        >
          <span className="user-name text-truncate mb-0">{title}</span>
        </Link>
      )
    }
  },
  {
    name: "Views",
    nameKey: "views",
    sortable: false,
    maxWidth: "50px",
    sortField: "views",
    // selector: row => row.views,
    cell: (row) => <span className="pl-2">{row.views || 0}</span>
  },
  {
    name: "Language",
    nameKey: "language",
    sortable: false,
    maxWidth: "50px",
    sortField: "language",
    // selector: row => row.views,
    cell: (row) => <span className="pl-2">{row.language || "inconnu" }</span>
  },

  {
    sortable: false,
    name: "Published",
    nameKey: "published",
    maxWidth: "50px",
    sortField: "balance",
    // selector: row => row.balance,
    cell: (row) => {
      if (row.published) {
        return <Badge color="light-success">True</Badge>
      } else {
        return <Badge color="light-danger">False</Badge>
      }
    }
  },
  {
    name: "Actions",
    nameKey: "actions",
    minWidth: "110px",
    cell: (row) => {
      const [modal, setModal] = useState(false)
      return (
        <div className="column-action d-flex align-items-center">
          <Link
            to={{ pathname: `/post/preview/${row.id}`, state: row }}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          <Link
            to={{ pathname: `/post/edit/${row.id}`, state: row }}
            id={`pw-tooltip-${row.id}`}
          >
            <Edit size={17} className="mx-1" />
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
