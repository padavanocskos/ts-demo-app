import React, { createContext, FC, useCallback, useEffect, useState } from "react"
import IContact from "./IContact"
import { DataGrid, GridColDef, GridFilterModel, GridSortModel, GridRowSelectionModel, GridLogicOperator, GridFilterItem, GridFilterForm } from '@mui/x-data-grid'
import axios from 'axios'
import { useQuery } from "react-query"
import { paramsSerializer } from "../../../utils/paramsSerializer"
import { Box, Button, Card, FormControl, FormLabel, Modal, Switch, TextField, Typography } from "@mui/material"
import ContactForm from "./Forms/ContactForm"
import { SearchProvider } from "./Forms/Search/SearchContext"
import GridSearchbar from "./Forms/Search/GridSearchbar"

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

  // destructuring these values from YAML vardef file.
  // - parsing Gridcoldef
  // - parsing simple and advanced search field for right search state
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
  
  const searchFields = [
                      { field: 'first_name' },
                      { field: 'last_name' },
                      { field: 'middle_name' },
                      { field: 'phone_1' },
                      { field: 'mobile_1' },
                    ]

  const [searchbarIsVisible, setSearchbarIsVisible] = useState<boolean>(false)

  // TODO: add loader to initial state, when table data is loading
  return(
    <>
      <Modal open={open} onClose={handleClose}>
        <ContactForm />
      </Modal>
      <Typography variant="h3" gutterBottom>Contacts</Typography>
      <Box sx={{
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& hr': {
          mx: 0.5,
        },
       }}>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '20px',
            '& svg': {
              m: 1,
            },
            '& hr': {
              mx: 0.5,
            },
          }}
        >
          <div style={{ marginLeft: "auto"}}>
            <FormLabel>Search Form</FormLabel>
            <Switch
              checked={searchbarIsVisible}
              onChange={( event: React.ChangeEvent<HTMLInputElement>) => { setSearchbarIsVisible(event.target.checked) } }
            />
          </div>
          {/* <IconButton onClick={ handleShowSearchForm }><FilterAltOutlined /></IconButton> */}
          <Button variant='contained' onClick={handleOpen} sx={{ margin: '8px' }}>Add</Button>
          <Button variant='contained' color='error' sx={{ margin: '8px' }}>Delete</Button>
        </Card>
        <GridSearchbar searchbarIsVisible={searchbarIsVisible} queryOptions={queryOptions} setQueryOptions={setQueryOptions} fieldDefs={searchFields} />
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
        />
      </Box>
  {/* import useFieldsState from "../../../../shared/grid/search_form/hooks/fields_state"; */}
        </>
    )
}

export default Contacts