// ** React Imports
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

// ** Table Columns
import { columns } from "./columns"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Spinner } from "reactstrap"

// ** Store & Actions
import { getPostFiltered, getPosts, getPostSearchFiltered } from "../store"
import { useDispatch, useSelector } from "react-redux"

// ** Styles
// import "@styles/react/apps/app-invoice.scss"
// import "@styles/react/libs/tables/react-dataTable-component.scss"
import { paginateArray } from "../../../utility/Utils"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage }) => {

  const { t } = useTranslation()

  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">{t('buttons.show')}</label>
            <Input
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              className="form-control ms-50 pe-3"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
          <Button tag={Link} to="/post/add" color="primary">
            {t('buttons.add')}
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">{t('search.search')}</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={value}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder={t('search.search_post')}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const PostsList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.post)
  const { get: getPostList } = useFetch()

  // ** States
  const [value, setValue] = useState("")
  const [sort, setSort] = useState("desc")
  const [sortColumn, setSortColumn] = useState("id")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { t } = useTranslation()

  const translatedColumns = columns.map((column) => ({
    ...column,
    name: t(`table.${column.nameKey}`)
  }))


  useEffect(() => {
    getPostList("/post/").then((res) => {
      dispatch(
        getPosts({
          q: value,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          allData: res ? res : [],
          total: res ? res.length : 0
        })
      )
    })
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  const handleFilter = (val) => {
    setValue(val)
    const queryLowered = val.toLowerCase()
    const filteredData = store.allData.filter((post) => {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        post.title.toLowerCase().includes(queryLowered) ||
        post.intro.toLowerCase().includes(queryLowered) ||
        post.content.toLowerCase().includes(queryLowered) ||
        post.language.toLowerCase().includes(queryLowered) ||
        String(post.id).toLowerCase().includes(queryLowered)
      )
    })
    dispatch(
      getPostSearchFiltered({
        data: filteredData,
        total: filteredData.length
      })
    )
  }

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value)
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value
      })
    )
  }

  const handlePagination = (page) => {
    dispatch(
      getPostFiltered({
        sort,
        q: value,
        sortColumn,
        status: statusValue,
        perPage: rowsPerPage,
        page: page.selected + 1,
        data: paginateArray(store.allData, rowsPerPage, page.selected + 1)
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    )
  }

  const dataToRender = () => {
    const filters = {
      q: value,
      status: statusValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    )
  }

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          {store.allData ? (
            <DataTable
              noHeader
              pagination
              sortServer
              paginationServer
              subHeader={true}
              columns={translatedColumns}
              responsive={true}
              onSort={handleSort}
              data={dataToRender()}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              defaultSortField="invoiceId"
              paginationDefaultPage={currentPage}
              paginationComponent={CustomPagination}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  statusValue={statusValue}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  handleStatusValue={handleStatusValue}
                />
              }
            />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center my-2">
              <Spinner
                size="lg"
                className="me-25 my-2 text-primary"
                style={{ height: "40px", width: "40px" }}
              />
              <span>{t('messages.fetching_post_data')}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default PostsList
