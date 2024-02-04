export type ProjectInfo = {
  id: number;
  title: string;
  parentId: number | null;
  beginDate: string;
  expirationDate: string | null;
  deleted: number;
};

export type DeviceInfo = {
  deviceId: number;
  projectId: number;
  serialNumber: string;
};

export type UserInfo = {
  appuserId: number;
  projectId: number;
  firstName: string;
  lastName: string;
  disabled: number;
};

export type ProjectFullDetails = {
  id: number;
  title: string;
  parentId: number | null;
  beginDate: string;
  expirationDate?: string;
  deleted: number;
  userIds: number[];
  deviceIds: number[];
};

export type User = {
  id: number;
  projectIds: number[];
  firstName: string;
  lastName: string;
  disabled: number;
};

export type Device = {
  id: number;
  projectIds: number[];
  serialNumber: string;
};
