import { useState, useContext } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { UsersTableContainer } from './styles';
import DeleteConfirmationModal from '../../ui/delete-confirmation-modal/DeleteConfirmationModal';
import { userMap } from '../../../utils/userDataTransformer/userDataTransformer';
import { StateContext } from '../../../utils/createStateContext';
import Chip from '@mui/material/Chip';
import SuccessSnackbar from '../../ui/success-snackbar/SuccessSnackbar';

interface Props {
  userIds?: number[];
  projectId: number;
}

const UsersTab: React.FC<Props> = ({ userIds, projectId }) => {
  const [isDeleteModalOpen, setIsDeleteModaOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { dispatch } = useContext(StateContext);

  const handleUserDelete = () => {
    if (selectedUserId) {
      dispatch({
        type: 'DELETE_USER',
        payload: { projectId: projectId, userId: selectedUserId },
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
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'disabled',
      headerName: 'Status',
      description: 'If the user account is disabled or not',
      sortable: false,
      width: 130,
      renderCell: (data) => {
        return (
          <Chip
            label={data.value ? 'Disabled' : 'Active'}
            color={data.value ? 'default' : 'success'}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 160,
      renderCell: (data) => (
        <Button
          variant='outlined'
          onClick={() => {
            setIsDeleteModaOpen(true);
            setSelectedUserId(data.row.id);
          }}
          color='error'
          size='small'
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
          rows={userIds ? userIds?.map((id) => userMap.get(id)) : []}
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
          selectedUserId &&
          userMap.get(selectedUserId)?.firstName +
            ' ' +
            userMap.get(selectedUserId)?.lastName
        }
        isDeleteConfirmationModalOpen={isDeleteModalOpen}
        setIsDeleteConfirmationModalOpen={() => setIsDeleteModaOpen(false)}
        handleCancel={() => setIsDeleteModaOpen(false)}
        handleDelete={handleUserDelete}
      />
      <SuccessSnackbar
        isSnackbarOpen={isSnackbarOpen}
        handleCloseSnackbar={handleSnackbarClose}
        successMessage='User successfully deleted!'
      />
    </>
  );
};

export default UsersTab;
