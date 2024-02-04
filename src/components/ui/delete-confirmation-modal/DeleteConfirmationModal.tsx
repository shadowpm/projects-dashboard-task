import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  deletedItem?: string;
  isDeleteConfirmationModalOpen: boolean;
  setIsDeleteConfirmationModalOpen: () => void;
  handleCancel?: () => void;
  handleDelete?: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  isDeleteConfirmationModalOpen,
  setIsDeleteConfirmationModalOpen,
  handleCancel,
  handleDelete,
  deletedItem,
}) => {
  return (
    <Dialog
      open={isDeleteConfirmationModalOpen}
      onClose={setIsDeleteConfirmationModalOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete confirmation'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete <strong>{deletedItem}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='error'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
