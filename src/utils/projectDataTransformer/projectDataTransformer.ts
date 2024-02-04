import {
  ProjectInfo,
  DeviceInfo,
  UserInfo,
  ProjectFullDetails,
} from '../../types/types';

export const transformProjectsData = (
  projects: ProjectInfo[],
  devices: DeviceInfo[],
  users: UserInfo[],
): ProjectFullDetails[] => {
  return projects.map((project) => {
    const userIds = users
      .filter((user) => user.projectId === project.id)
      .map((user) => user.appuserId);
    const deviceIds = devices
      .filter((device) => device.projectId === project.id)
      .map((device) => device.deviceId);

    return {
      ...project,
      expirationDate: project.expirationDate
        ? project.expirationDate
        : undefined,
      userIds,
      deviceIds,
    };
  });
};
