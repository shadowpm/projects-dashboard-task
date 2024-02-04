import { User, UserInfo } from '../../types/types';
import users from '../../mocked-data/user.json';

export const transformUserData = (users: UserInfo[]): Map<number, User> => {
  const userMap = new Map<number, User>();

  for (const user of users) {
    if (!userMap.has(user.appuserId)) {
      userMap.set(user.appuserId, {
        id: user.appuserId,
        projectIds: users
          .filter((item) => item.appuserId === user.appuserId)
          .map((item) => item.projectId),
        firstName: user.firstName,
        lastName: user.lastName,
        disabled: user.disabled,
      });
    }
  }
  return userMap;
};

export const userMap = transformUserData(users);
