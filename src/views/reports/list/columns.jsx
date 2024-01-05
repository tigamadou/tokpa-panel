import moment from "moment"
import { useEffect, useState } from "react"
import { Eye } from "react-feather"
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

export const columns = [
  {
    name: "date",
    nameKey: "date",
    sortable: false,
    maxWidth: "400px",
    cell: (row) => (
      <span className="pl-2">
        {row.date ? moment(row.date).calendar() : "unknown"}
      </span>
    )
  },
  {
    name: "Report",
    nameKey: "report",
    sortable: false,
    minWidth: "50px",
    cell: (row) => {
      return (
        <>
          <span className="pl-2">{row.reason}</span>
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
      return <span className="pl-2">{ipaddress}</span>
    }
  },
  {
    name: "browser",
    nameKey: "browser",
    sortable: false,
    maxWidth: "200px",
    cell: (row) => {
      const browser = row.browser ? row.browser : ""
      return <span className="pl-2">{browser}</span>
    }
  },
  {
    name: "Author",
    nameKey: "author",
    sortable: false,
    maxWidth: "200px",
    cell: (row) => {
      const { get: getUser } = useFetch()
      const [author, setAuthor] = useState({})
      useEffect(() => {
        getUser(`/user/${row.reporter}`).then((res) => setAuthor(res))
      }, [])
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link
              to={{ pathname: `/user/view/${author.id}`, state: author }}
              className="user_name text-truncate text-body"
            >
              <span className="fw-bolder">{`${author.firstname} ${author.lastname}`}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">
              {author.email}
            </small>
          </div>
        </div>
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
            to={{ pathname: `/reports/preview/${row.id}`, state: row }}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          <Link
            to={{ pathname: `/post/preview/${row.post.id}`, state: row.post }}
            id={`pw-tooltip-${row.post.id}`}
          >
            view Post
          </Link>
        </div>
      )
    }
  }
]
