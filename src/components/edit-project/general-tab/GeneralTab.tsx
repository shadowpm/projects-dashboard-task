import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-datepicker/dist/react-datepicker.css';
import RangeDatePicker from '../../ui/range-datepicker/RangeDatepicker';
import DeleteConfirmationModal from '../../ui/delete-confirmation-modal/DeleteConfirmationModal';
import { ProjectFullDetails } from '../../../types/types';
import { StateContext } from '../../../utils/createStateContext';
import { useNavigate } from 'react-router-dom';
import SuccessSnackbar from '../../ui/success-snackbar/SuccessSnackbar';

interface Props {
  projectData: ProjectFullDetails;
}

const GeneralTab: React.FC<Props> = ({ projectData }) => {
  const [isDeleteModalOpen, setIsDeleteModaOpen] = useState(false);
  const [projectNameField, setProjectNameField] = useState(projectData?.title);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(StateContext);

  const [startDate, setStartDate] = useState<Date>(
    projectData?.beginDate ? new Date(projectData.beginDate) : new Date(),
  );
  const [endDate, setEndDate] = useState<Date | null>(
    projectData?.expirationDate
      ? new Date(projectData.expirationDate)
      : new Date(),
  );

  const handleProjectDelete = () => {
    dispatch({
      type: 'DELETE_PROJECT',
      payload: { projectId: projectData.id },
    });
    navigate('/');
  };

  const handleProjectSave = () => {
    dispatch({
      type: 'EDIT_PROJECT',
      payload: {
        projectId: projectData.id,
        updatedProject: {
          ...projectData,
          title: projectNameField,
          beginDate: startDate.toISOString(),
          expirationDate: endDate?.toISOString(),
        },
      },
    });
    setIsSnackbarOpen(true);
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

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='project-name'
          label='Project name'
          variant='outlined'
          value={projectNameField}
          onChange={(event) => setProjectNameField(event.target.value)}
          size='small'
        />
        <RangeDatePicker
          projectStartDate={startDate}
          projectEndDate={endDate}
          handleProjectStartDateChange={(date) => setStartDate(date)}
          handleProjectEndDateChange={(date) => setEndDate(date)}
        />
        <Stack direction='row' spacing={1}>
          <Button
            variant='contained'
            color='success'
            size='small'
            onClick={handleProjectSave}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            color='error'
            size='small'
            startIcon={<DeleteIcon />}
            onClick={() => setIsDeleteModaOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
      <DeleteConfirmationModal
        deletedItem='project'
        isDeleteConfirmationModalOpen={isDeleteModalOpen}
        setIsDeleteConfirmationModalOpen={() => setIsDeleteModaOpen(false)}
        handleCancel={() => setIsDeleteModaOpen(false)}
        handleDelete={handleProjectDelete}
      />
      <SuccessSnackbar
        isSnackbarOpen={isSnackbarOpen}
        handleCloseSnackbar={handleSnackbarClose}
        successMessage='Project saved!'
      />
    </>
  );
};

export default GeneralTab;
