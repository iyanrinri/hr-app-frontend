export enum SettingCategory {
  COMPANY = 'COMPANY',
  ATTENDANCE = 'ATTENDANCE',
  GENERAL = 'GENERAL',
  NOTIFICATION = 'NOTIFICATION',
  SECURITY = 'SECURITY'
}

export enum SettingDataType {
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  NUMBER = 'NUMBER',
  JSON = 'JSON'
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  parsedValue: string | number | boolean | null | undefined;
  category: SettingCategory;
  description: string;
  dataType: SettingDataType;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsResponse {
  data: Setting[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateSettingPayload {
  key: string;
  value: string | number | boolean;
}

export interface CreateSettingPayload {
  key: string;
  value: string | number | boolean;
  category: SettingCategory;
  description: string;
  dataType: SettingDataType;
  isPublic: boolean;
}
