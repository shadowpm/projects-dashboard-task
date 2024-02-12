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
import { useSearchParams } from 'react-router-dom';

const convertUserIdsToUsersString = (ids: number[]): string => {
  return ids
    .map((id) => userMap.get(id)?.firstName + ' ' + userMap.get(id)?.lastName)
    .join(', ');
};

const convertDeviceIdsToSerialNumbersString = (ids: number[]): string => {
  return ids.map((id) => devicesMap.get(id)?.serialNumber).join(', ');
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('p') || 1);

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

  const changePage = (page: number) => {
    setSearchParams({ p: String(page) });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    changePage(1);
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
            onChange={(_, p) => changePage(p)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
