import { useState, SyntheticEvent, useContext } from 'react';
import Header from '../ui/header/Header';
import { useNavigate } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UsersTab from './users-tab/UsersTab';
import DevicesTab from './devices-tab/DevicesTab';
import GeneralTab from './general-tab/GeneralTab';
import { useParams } from 'react-router-dom';
import { StateContext } from '../../utils/createStateContext';

interface Props {
  defaultTab?: string;
}

const EditProject: React.FC<Props> = ({ defaultTab }) => {
  const [value, setValue] = useState(defaultTab ? defaultTab : 'general');
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { state } = useContext(StateContext);

  const projectData = state.find((project) => project.id === Number(projectId));

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    // event.preventDefault();
    setValue(newValue);
    if (newValue !== 'general') {
      navigate(`/edit/${projectId}/${newValue}`);
    } else {
      navigate(`/edit/${projectId}`);
    }
  };

  if (!projectData) {
    return null;
  }
  return (
    <div>
      <Header
        pageHeader={projectData.title}
        showBackButton={true}
        onBackButtonClick={() => navigate('/')}
        hideSearchBar={true}
      />
      <Box sx={{ width: '100%', typography: 'body1' }} paddingTop={2}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              paddingLeft: '30px',
            }}
          >
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='General info' value='general' />
              <Tab label='Users' value='users' />
              <Tab label='Devices' value='devices' />
            </TabList>
          </Box>
          <TabPanel value='general'>
            <GeneralTab projectData={projectData} />
          </TabPanel>
          <TabPanel value='users'>
            <UsersTab
              userIds={projectData.userIds}
              projectId={projectData.id}
            />
          </TabPanel>
          <TabPanel value='devices'>
            <DevicesTab
              deviceIds={projectData.deviceIds}
              projectId={projectData.id}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default EditProject;
