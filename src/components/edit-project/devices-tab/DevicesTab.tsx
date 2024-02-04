import { useState, useContext } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationModal from '../../ui/delete-confirmation-modal/DeleteConfirmationModal';
import { devicesMap } from '../../../utils/deviceDataTransformer/deviceDataTransformer';
import { UsersTableContainer } from './styles';
import { StateContext } from '../../../utils/createStateContext';
import SuccessSnackbar from '../../ui/success-snackbar/SuccessSnackbar';

interface Props {
  deviceIds?: number[];
  projectId: number;
}

const DevicesTab: React.FC<Props> = ({ deviceIds, projectId }) => {
  const [isDeleteModalOpen, setIsDeleteModaOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { dispatch } = useContext(StateContext);

  const handleDeviceDelete = () => {
    if (selectedDeviceId) {
      dispatch({
        type: 'DELETE_DEVICE',
        payload: { projectId: projectId, deviceId: selectedDeviceId },
      });
      setIsDeleteModaOpen(false);
      setIsSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Device ID', width: 100, sortable: false },
    {
      field: 'serialNumber',
      headerName: 'Serial number',
      width: 200,
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (data) => (
        <Button
          variant='outlined'
          color='error'
          size='small'
          onClick={() => {
            setIsDeleteModaOpen(true);
            setSelectedDeviceId(data.row.id);
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <UsersTableContainer>
        <DataGrid
          rows={deviceIds ? deviceIds?.map((id) => devicesMap.get(id)) : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </UsersTableContainer>
      <DeleteConfirmationModal
        deletedItem={
          selectedDeviceId && devicesMap.get(selectedDeviceId)?.serialNumber
        }
        isDeleteConfirmationModalOpen={isDeleteModalOpen}
        setIsDeleteConfirmationModalOpen={() => setIsDeleteModaOpen(false)}
        handleCancel={() => setIsDeleteModaOpen(false)}
        handleDelete={handleDeviceDelete}
      />
      <SuccessSnackbar
        isSnackbarOpen={isSnackbarOpen}
        handleCloseSnackbar={handleSnackbarClose}
        successMessage='Device successfully deleted!'
      />
    </>
  );
};

export default DevicesTab;
