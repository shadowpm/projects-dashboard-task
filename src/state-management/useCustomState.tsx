import { ProjectFullDetails } from '../types/types';
import { transformProjectsData } from '../utils/projectDataTransformer/projectDataTransformer';
import projects from '../mocked-data/project.json';
import users from '../mocked-data/user.json';
import devices from '../mocked-data/device.json';

export type ActionType =
  | {
      type: 'EDIT_PROJECT';
      payload: { projectId: number; updatedProject: ProjectFullDetails };
    }
  | { type: 'DELETE_PROJECT'; payload: { projectId: number } }
  | { type: 'DELETE_USER'; payload: { projectId: number; userId: number } }
  | { type: 'DELETE_DEVICE'; payload: { projectId: number; deviceId: number } };

export const initialState = transformProjectsData(projects, devices, users);

export const projectReducer = (
  state: ProjectFullDetails[],
  action: ActionType,
): ProjectFullDetails[] => {
  switch (action.type) {
    case 'EDIT_PROJECT':
      return state.map((project) =>
        project.id === action.payload.projectId
          ? action.payload.updatedProject
          : project,
      );
    case 'DELETE_PROJECT':
      return state.filter((project) => project.id !== action.payload.projectId);
    case 'DELETE_USER':
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              userIds: project.userIds.filter(
                (id) => id !== action.payload.userId,
              ),
            }
          : project,
      );
    case 'DELETE_DEVICE':
      return state.map((project) =>
        project.id === action.payload.projectId
          ? {
              ...project,
              deviceIds: project.deviceIds.filter(
                (id) => id !== action.payload.deviceId,
              ),
            }
          : project,
      );
    default:
      return state;
  }
};
