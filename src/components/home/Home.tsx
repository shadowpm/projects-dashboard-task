import React, { useContext, useState } from 'react';
import Header from '../ui/header/Header';
import ProjectCard from '../ui/project-card/ProjectCard';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { formatDatesRange } from '../../utils/dateFormatter/dateFormatter';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../../utils/createStateContext';
import { userMap } from '../../utils/userDataTransformer/userDataTransformer';
import { devicesMap } from '../../utils/deviceDataTransformer/deviceDataTransformer';

const convertUserIdsToUsersString = (ids: number[]): string => {
  return ids
    .map((id) => userMap.get(id)?.firstName + ' ' + userMap.get(id)?.lastName)
    .join(', ');
};

const convertDeviceIdsToSerialNumbersString = (ids: number[]): string => {
  return ids.map((id) => devicesMap.get(id)?.serialNumber).join(', ');
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const { state } = useContext(StateContext);

  const itemsPerPage = 8;

  const filteredProjects = state.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginatedProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Header
        pageHeader='Projects'
        onSearch={handleSearch}
        searchValue={searchQuery}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        p={4}
      >
        {paginatedProjects.map((project) => (
          <Grid item xs={12} sm={4} md={3} key={project.id}>
            <ProjectCard
              projectTitle={project.title}
              projectDuration={formatDatesRange(
                project.beginDate,
                project.expirationDate,
              )}
              usersList={convertUserIdsToUsersString(project.userIds)}
              devicesList={convertDeviceIdsToSerialNumbersString(
                project.deviceIds,
              )}
              onClickEdit={() => navigate(`/edit/${project.id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        direction='row'
        alignItems='center'
        justifyContent='center'
      >
        <Grid item p={4}>
          <Pagination
            count={Math.ceil(filteredProjects.length / itemsPerPage)}
            variant='outlined'
            color='primary'
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
