import { Eye } from "react-feather"
import { Link } from "react-router-dom"

export const columns = [
  {
    name: "datetime",
    nameKey: "datetime",
    sortable: false,
    maxWidth: "400px",
    cell: (row) => (
      <span className="pl-2">
        {row.datetime ? row.datetime : "unknown"}
      </span>
    )
  },
  {
    name: "Error",
    nameKey: "error",
    sortable: false,
    minWidth: "50px",
    cell: (row) => {
      const message = row.message ? row.message.message : ""
      return (
        <>
          <span className="pl-2">
            {message}
          </span>
        </>
      )
    }
  },
  {
    name: "ipaddress",
    nameKey: "ipaddress",
    sortable: false,
    maxWidth: "150px",
    cell: (row) => {
      const ipaddress = row.ip ? row.ip : ""
      return (
        <span className="pl-2" >
          {ipaddress}
        </span >
      )
    }
  },
  {
    name: "browser",
    nameKey: "browser",
    sortable: false,
    maxWidth: "200px",
    cell: (row) => {
      const browser = row.browser ? row.browser : ""
      return (
        <span className="pl-2">
          {browser}
        </span>
      )
    }
  },
  {
    name: "os",
    nameKey: "os",
    sortable: false,
    maxWidth: "200px",
    cell: (row) => {
      const platform = row.platform ? row.platform : ""
      return (
        <span className="pl-2">
          {platform}
        </span>
      )
    }
  },
  {
    name: "Actions",
    nameKey: "actions",
    minWidth: "110px",
    cell: (row) => {
      return (
        <div className="column-action d-flex align-items-center">
          <Link
            to={{ pathname: `/errors/preview/${row.id}`, state: row }}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
        </div>
      )
    }
  }
]
