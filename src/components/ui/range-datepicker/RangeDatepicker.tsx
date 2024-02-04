import 'react-datepicker/dist/react-datepicker.css';
import Typography from '@mui/material/Typography';
import { DatePickerContainer } from './styles';
import DatePicker from 'react-datepicker';

interface Props {
  projectStartDate: Date | null;
  projectEndDate: Date | null;
  handleProjectStartDateChange: (date: Date) => void;
  handleProjectEndDateChange: (date: Date | null) => void;
}

const RangeDatePicker: React.FC<Props> = ({
  projectStartDate,
  projectEndDate,
  handleProjectEndDateChange,
  handleProjectStartDateChange,
}) => {
  return (
    <DatePickerContainer>
      <Typography variant='overline' display='block' gutterBottom>
        From
      </Typography>
      <DatePicker
        showIcon
        selected={projectStartDate}
        onChange={handleProjectStartDateChange}
        popperPlacement='top-start'
      />
      <Typography variant='overline' display='block' gutterBottom>
        To
      </Typography>
      <DatePicker
        showIcon
        selected={projectEndDate}
        onChange={handleProjectEndDateChange}
        popperPlacement='top-start'
      />
    </DatePickerContainer>
  );
};

export default RangeDatePicker;
