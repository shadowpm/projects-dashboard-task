import { useReducer, useMemo } from 'react';
import './App.css';
import EditProject from './components/edit-project/EditProject';
import Home from './components/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  initialState,
  projectReducer,
} from './state-management/useCustomState';
import { StateContext } from './utils/createStateContext';

function App() {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const stateValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <Router>
      <StateContext.Provider value={stateValue}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:projectId' element={<EditProject />} />
        </Routes>
      </StateContext.Provider>
    </Router>
  );
}

export default App;
