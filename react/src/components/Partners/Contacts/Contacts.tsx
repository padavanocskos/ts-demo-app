import React, { FC, useCallback, useEffect, useState } from "react"
import IContact from "./IContact"
import { DataGrid, GridColDef, GridFilterModel, GridSortModel, GridRowSelectionModel } from '@mui/x-data-grid'
import axios from 'axios'
import { useQuery } from "react-query"
import { paramsSerializer } from "../../../utils/paramsSerializer"
import { Box, Button, Grid, Modal, TextField } from "@mui/material"
import ContactForm from "./ContactForm"

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
                                      params: { paginationModel, ...queryOptions, columns: columns },
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

  const [checkboxSelection, setCheckboxSelection] = React.useState(true)
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([])

  useEffect(() => console.log("selection model:", rowSelectionModel), [rowSelectionModel])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', resizable: true, type: 'number' },
    { field: 'first_name', headerName: 'First name', type: 'string' },
    { field: 'last_name', headerName: 'Last name', type: 'string'},
    { field: 'middle_name', headerName: 'Middle name', type: 'string' },
    { field: 'email', headerName: 'Email', type: 'string' },
    { field: 'phone1', headerName: 'Phone 1', type: 'string', resizable: true },
    { field: 'phone2', headerName: 'Phone 2', type: 'string' },
    { field: 'mobile1', headerName: 'Mobile 1', type: 'string' },
    { field: 'mobile2', headerName: 'Mobile 2', type: 'string' },
  ]

  // TODO: add loader to initial state, when table data is loading
  return(
    <>
      <Button variant='contained' onClick={handleOpen}>Add</Button>
      <Button variant='contained' color='error'>Delete</Button>
      <Modal open={open} onClose={handleClose}>
          <ContactForm />
        {/* </Box> */}
      </Modal>
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
          checkboxSelection={checkboxSelection}
          onRowSelectionModelChange={(newSelectionModel) => setRowSelectionModel(newSelectionModel)}
          rowSelectionModel={rowSelectionModel}
          // slots={{ toolbar: GridToolbar }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: false,
          //     // quickFilterProps: { debounceMs: 500 },
          //   },
          // }}
        />
      </Box>
    </>
  )
}

export default Contacts