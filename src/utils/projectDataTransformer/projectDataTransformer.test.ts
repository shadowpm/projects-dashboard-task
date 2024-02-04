import { transformProjectsData } from './projectDataTransformer';

describe('transformProjectsData', () => {
  const projectInfoData = [
    {
      id: 1,
      title: 'Project A',
      parentId: null,
      beginDate: '2022-01-01',
      expirationDate: '2022-02-01',
      deleted: 0,
    },
    {
      id: 2,
      title: 'Project B',
      parentId: null,
      beginDate: '2022-03-01',
      expirationDate: '2023-02-01',
      deleted: 0,
    },
  ];

  const deviceInfoData = [
    { deviceId: 101, projectId: 1, serialNumber: 'ABC123' },
    { deviceId: 102, projectId: 1, serialNumber: 'XYZ456' },
  ];

  const userInfoData = [
    {
      appuserId: 201,
      projectId: 1,
      firstName: 'John',
      lastName: 'Doe',
      disabled: 0,
    },
    {
      appuserId: 202,
      projectId: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      disabled: 1,
    },
  ];

  test('transforms projects data correctly', () => {
    const transformedProjects = transformProjectsData(
      projectInfoData,
      deviceInfoData,
      userInfoData,
    );

    expect(transformedProjects.length).toBe(2);

    expect(transformedProjects[0]).toEqual({
      id: 1,
      title: 'Project A',
      parentId: null,
      beginDate: '2022-01-01',
      expirationDate: '2022-02-01',
      deleted: 0,
      userIds: [201, 202],
      deviceIds: [101, 102],
    });

    expect(transformedProjects[1]).toEqual({
      id: 2,
      title: 'Project B',
      parentId: null,
      beginDate: '2022-03-01',
      expirationDate: '2023-02-01',
      deleted: 0,
      userIds: [],
      deviceIds: [],
    });
  });
});
