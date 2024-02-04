import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Props {
  isSnackbarOpen: boolean;
  handleCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void;
  successMessage: string;
}

const SuccessSnackbar: React.FC<Props> = ({
  isSnackbarOpen,
  handleCloseSnackbar,
  successMessage,
}) => {
  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity='success'
        variant='filled'
        sx={{ width: '100%' }}
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
