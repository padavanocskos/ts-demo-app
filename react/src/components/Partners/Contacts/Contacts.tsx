import { FC, useCallback, useEffect, useState } from "react"
import IContact from "./IContact"
import { DataGrid, GridColDef, GridFilterModel, GridSortItem, GridSortModel, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios'
import { useQuery } from "react-query"
import { paramsSerializer } from "../../../utils/paramsSerializer"
import { Box } from "@mui/material"

const Contacts: FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [queryOptions, setQueryOptions] = useState({});
  const handleSortChange = (sortModel: GridSortModel) => {
    setQueryOptions({ ...queryOptions, sortModel: { ...sortModel } })
  };

  const getRows = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/contacts`,
                                     {
                                      params: { paginationModel, ...queryOptions },
                                      paramsSerializer: paramsSerializer                                     
                                     }
                                 )
                                 .catch((error) => console.log(error))
                                 .then((response) => { console.log("RESP", response); return response })
    return response?.data
  }

  const handleFilterChange = (filterModel: GridFilterModel) => {
    setQueryOptions({ ...queryOptions, filterModel: { ...filterModel } });
  }

  const handlePaginationChange = useCallback((paginationModel: any) => {
    setPaginationModel(paginationModel);
  }, []);

  const { 
    data,
    error,
    isLoading
  } = useQuery(
    ["contactsData", { ...paginationModel, ...queryOptions }], 
    getRows
  )

  useEffect(() => console.log("QOPTS",queryOptions), [queryOptions])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'first_name', headerName: 'First name' },
    { field: 'last_name', headerName: 'Last name' },
    { field: 'middle_name', headerName: 'Middle name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone1', headerName: 'Phone 1' },
    { field: 'phone2', headerName: 'Phone 2' },
    { field: 'mobile1', headerName: 'Mobile 1' },
    { field: 'mobile2', headerName: 'Mobile 2' },
  ]

  // TODO: add loader to initial state, when table data is loading
  return(
    <>
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={data?.rows || []}
          columns={columns}
          rowCount={data?.totalRows || 0}
          loading={isLoading}
          paginationMode="server"
          pageSizeOptions={[5, 10, 25, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          sortingMode="server"
          onSortModelChange={handleSortChange}
          filterMode="server"
          onFilterModelChange={handleFilterChange}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </>
  )
}

export default Contacts