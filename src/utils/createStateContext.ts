import { ActionType, initialState } from '../state-management/useCustomState';
import { ProjectFullDetails } from '../types/types';
import { createContext } from 'react';

export const StateContext = createContext<{
  state: ProjectFullDetails[];
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});
