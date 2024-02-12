import { useReducer, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProject from './components/edit-project/EditProject';
import Home from './components/home/Home';
import './App.css';
import {
  initialState,
  projectReducer,
} from './state-management/useCustomState';
import { StateContext } from './utils/createStateContext';

const App = () => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const stateValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <Router>
      <StateContext.Provider value={stateValue}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:projectId' element={<EditProject />} />
          <Route path='/edit/:projectId/users' element={<EditProject defaultTab="users" />} />
          <Route path='/edit/:projectId/devices' element={<EditProject defaultTab="devices" />} />
        </Routes>
      </StateContext.Provider>
    </Router>
  );
};

export default App;
