import { ActionType, projectReducer } from './useCustomState';
import { ProjectFullDetails } from '../types/types';

describe('projectReducer', () => {
  const mockProject: ProjectFullDetails = {
    id: 1,
    title: 'Test Project',
    parentId: null,
    beginDate: '2022-01-01',
    expirationDate: '2022-02-01',
    deleted: 0,
    userIds: [1, 2],
    deviceIds: [3, 4],
  };

  const mockState: ProjectFullDetails[] = [mockProject];

  test('should handle EDIT_PROJECT', () => {
    const updatedProject: ProjectFullDetails = {
      ...mockProject,
      title: 'Updated Test Project',
    };
    const action: ActionType = {
      type: 'EDIT_PROJECT',
      payload: { projectId: 1, updatedProject },
    };

    const newState = projectReducer(mockState, action);

    expect(newState[0].title).toBe('Updated Test Project');
  });

  test('should handle DELETE_USER', () => {
    const action: ActionType = {
      type: 'DELETE_USER',
      payload: { projectId: 1, userId: 1 },
    };

    const newState = projectReducer(mockState, action);

    expect(newState[0].userIds).toEqual([2]);
  });

  test('should handle DELETE_PROJECT', () => {
    const action: ActionType = {
      type: 'DELETE_PROJECT',
      payload: { projectId: 1 },
    };

    const newState = projectReducer(mockState, action);

    expect(newState).toEqual([]);
  });

  test('should handle DELETE_DEVICE', () => {
    const action: ActionType = {
      type: 'DELETE_DEVICE',
      payload: { projectId: 1, deviceId: 3 },
    };

    const newState = projectReducer(mockState, action);

    expect(newState[0].deviceIds).toEqual([4]);
  });
});
