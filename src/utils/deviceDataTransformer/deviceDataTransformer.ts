import { Device, DeviceInfo } from '../../types/types';
import devices from '../../mocked-data/device.json';

export const transformDeviceData = (
  devices: DeviceInfo[],
): Map<number, Device> => {
  const deviceMap = new Map<number, Device>();

  for (const device of devices) {
    if (!deviceMap.has(device.deviceId)) {
      deviceMap.set(device.deviceId, {
        id: device.deviceId,
        serialNumber: device.serialNumber,
        projectIds: devices
          .filter((item) => item.deviceId === device.deviceId)
          .map((item) => item.projectId),
      });
    }
  }
  return deviceMap;
};

export const devicesMap = transformDeviceData(devices);
