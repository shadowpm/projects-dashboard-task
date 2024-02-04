import { transformDeviceData } from './deviceDataTransformer';

describe('transformDeviceData', () => {
  const deviceInfoData = [
    { deviceId: 1, projectId: 101, serialNumber: 'ABC123' },
    { deviceId: 1, projectId: 102, serialNumber: 'ABC123' },
    { deviceId: 2, projectId: 103, serialNumber: 'XYZ456' },
  ];

  test('transforms device data correctly', () => {
    const deviceMap = transformDeviceData(deviceInfoData);

    expect(deviceMap.size).toBe(2);

    expect(deviceMap.get(1)).toEqual({
      id: 1,
      serialNumber: 'ABC123',
      projectIds: [101, 102],
    });

    expect(deviceMap.get(2)).toEqual({
      id: 2,
      serialNumber: 'XYZ456',
      projectIds: [103],
    });
  });
});
