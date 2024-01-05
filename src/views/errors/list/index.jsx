// ** React Imports
import { Link } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"

// ** Table Columns
import { columns } from "./columns"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown, Trash } from "react-feather"
import DataTable from "react-data-table-component"
import { toast } from "react-toastify"

// ** Reactstrap Imports
import { Button, Input, Row, Col, Card, Spinner } from "reactstrap"

// ** Store & Actions
import { getErrors, getErrorSearchFiltered, getErrorFiltered } from "../store"
import { useDispatch, useSelector } from "react-redux"

// ** Styles
// import "@styles/react/apps/app-invoice.scss"
// import "@styles/react/libs/tables/react-dataTable-component.scss"
import { paginateArray } from "../../../utility/Utils"
import useFetch from "../../hooks/useFetch"
import { useTranslation } from 'react-i18next'

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage, selectedRows, handleDelete }) => {

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
              placeholder={t('search.search_errors')}
            />
          </div>
        </Col>
      </Row>
      {selectedRows.length > 0 && (
        <Row className="mt-2 bg-light p-1 border-rounded">
          <Col
            lg="12"
            className="actions-right d-flex align-items-center justify-content-lg-between flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
          >
            <>
              <p>
                {selectedRows.length} élément(s) selectionnés
              </p>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete()}
              >
                <Trash size={17} className="mx-1" /> {t('buttons.delete')}
              </button>
            </>
          </Col>
        </Row>
      )}
    </div>
  )
}

const ErrorsList = () => {
  // ** Store vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.error)
  const { get: getErrorList, destroy: deleteError } = useFetch()


  // ** States
  const [value, setValue] = useState("")
  const [sort, setSort] = useState("desc")
  const [sortColumn, setSortColumn] = useState("id")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const [clearRows, setClearRows] = useState(false)

  const { t } = useTranslation()

  const translatedColumns = columns.map((column) => ({
    ...column,
    name: t(`table.${column.nameKey}`)
  }))

  const reverseData = (data) => (data ? [...data].reverse() : [])


  useEffect(() => {
    getErrorList("/error/").then((res) => {
      dispatch(
        getErrors({
          q: value,
          page: currentPage,
          perPage: rowsPerPage,
          status: statusValue,
          allData: reverseData(res),
          total: res ? res.length : 0
        })
      )
    })
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  const handleFilter = (val) => {
    setValue(val)
    const queryLowered = val.toLowerCase()
    const filteredData = store.allData.filter((error) => {
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      return (
        JSON.stringify(error).toLowerCase().includes(queryLowered)
      )
    })
    dispatch(
      getErrorSearchFiltered({
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
      getErrorFiltered({
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

  const handleSelect = (row) => {
    const selectedRows = row.selectedRows
    const newSelectedRows = selectedRows.map((row) => (row.id))
    setSelectedRows(newSelectedRows)
  }


  const handleDelete = useCallback(() => {
    deleteError("/error/", { ids: selectedRows })
    .then(() => {
        setSelectedRows([])
        setClearRows(!clearRows)
        getErrorList("/error/").then((res) => {
          toast.success(t('messages.error_deleted'))
          dispatch(
            getErrors({
              q: value,
              page: currentPage,
              perPage: rowsPerPage,
              status: statusValue,
              allData: reverseData(res),
              total: res ? res.length : 0
            })
          )
        })
      })
      .catch(() => {
        setSelectedRows([])
        toast.error(t('messages.error_not_deleted'))
      })
  }, [selectedRows])

  console.log("selectedRows = ", selectedRows)
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
              selectableRows
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
              onSelectedRowsChange={handleSelect}
              clearSelectedRows={clearRows}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  statusValue={statusValue}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  handleStatusValue={handleStatusValue}
                  selectedRows={selectedRows}
                  handleDelete={handleDelete}
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

export default ErrorsList
