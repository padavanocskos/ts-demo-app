import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import axios from "axios";
import React, { FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { paramsSerializer } from "../../../utils/paramsSerializer";
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from "@mui/icons-material";
import ContactForm from "../../Partners/Contacts/ContactForm";

const Cores: FC = () => {
  const [paginationModel, setPaginationModel] = useState({
      pageSize: 5,
      page: 0,
  });

  const [queryOptions, setQueryOptions] = useState({});
  const onButtonClick = (e, params) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("EVENT", e)
    console.log(params)
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number', resizable: false },
    { field: 'core_number', headerName: 'Core Nr.', type: 'number', resizable: false },
    { field: 'weight', headerName: 'Weight', type: 'number', resizable: false },
    { field: 'is_faulty', headerName: 'Is Faulty?', type: 'boolean', resizable: false },
    { field: 'notice', headerName: 'Notice', type: 'text', flex: 1, resizable: false },
    { field: 'actions', headerName: 'Actions', flex: 0.35, renderCell: (params) => {
        return (
          <>
            <Button
              onClick={handleOpen}
              variant="contained"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={(e) => onButtonClick(e, params.row)}
              variant="contained"
            >
              <Delete />
            </Button>
          </>
        );
      }
    },
  ]

  const getRows = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/cores', {
        params: { paginationModel, ...queryOptions, columns: columns },
        paramsSerializer: paramsSerializer,
    })
    .catch(error => console.log('error'))
    .then(response => { console.log("RESPONSE", response); return response })
    return response?.data
  }

  const handlePaginationChange = useCallback((paginationModel: any) => {
    setPaginationModel(paginationModel);
  }, []);

  const { data, error, isLoading } = useQuery(
    ["coresData", { ...paginationModel, ...queryOptions }], 
    getRows)

  const handleSortChange = (sortModel: GridSortModel) => {
    setQueryOptions({ ...queryOptions, sortModel: { ...sortModel } })
  };

  const [checkboxSelection, setCheckboxSelection] = React.useState(true)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <ContactForm />
      </Modal>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={ data?.rows || [] }
          columns={columns}
          rowCount={data?.totalRows || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          pageSizeOptions={[5, 10, 25, 100]}
          paginationMode="server"
          loading={isLoading}
          sortingMode="server"
          onSortModelChange={handleSortChange}
          checkboxSelection={checkboxSelection}
        ></DataGrid>
      </Box>
    </>
  )
}

export default Cores