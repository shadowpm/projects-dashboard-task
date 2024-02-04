import { transformUserData } from './userDataTransformer';

describe('transformUserData', () => {
  const userInfoData = [
    {
      appuserId: 1,
      projectId: 101,
      firstName: 'John',
      lastName: 'Doe',
      disabled: 0,
    },
    {
      appuserId: 2,
      projectId: 102,
      firstName: 'Jane',
      lastName: 'Doe',
      disabled: 1,
    },
  ];

  test('transforms user data correctly', () => {
    const transformedUsers = transformUserData(userInfoData);

    expect(transformedUsers.size).toBe(2);

    expect(transformedUsers.get(1)).toEqual({
      id: 1,
      projectIds: [101],
      firstName: 'John',
      lastName: 'Doe',
      disabled: 0,
    });

    expect(transformedUsers.get(2)).toEqual({
      id: 2,
      projectIds: [102],
      firstName: 'Jane',
      lastName: 'Doe',
      disabled: 1,
    });
  });
});
