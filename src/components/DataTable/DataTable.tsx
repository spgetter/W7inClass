import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridDataContainer, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api'; // ADD THIS
import { useGetData } from '../../custom-hooks'; // ADD THIS
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'; // ADD THESE
import { DroneForm } from '../../components/DroneForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Drone name',
      width: 150,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Cost',
      type: 'number',
      width: 150,
      editable: true
    },
    {
      field: 'camera_quality',
      headerName: 'CAMERA',
      width: 110,
      editable: true
    },
    {
      field: 'max_speed',
      headerName: 'Speed',
      width: 160,
      editable: true
    },
  ];
  
export const DataTable =  () => {
  
  let { droneData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(`${gridData[0]}`)
    getData()
  }

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Thrones In Inventory</h2>
          <DataGrid rows={droneData} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={(newSelectionModel) => {
            setData(newSelectionModel)
          }} 
          selectionModel={gridData}
          {...droneData}/>

          <Button color='primary' variant='contained' onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            {/*Dialog Pop Up begin */}
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Your Throne</DialogTitle>
            <DialogContent>
              <DialogContentText>Throne:{gridData[0]}</DialogContentText>
                <DroneForm id={`${gridData[0]}`}/>
            </DialogContent>
            <DialogActions>
              <Button onClick = {handleClose} color="primary">Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

