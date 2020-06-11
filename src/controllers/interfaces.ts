export interface CreateSensorDataBody {
  sensorId: string;
  time: number;
  value: number;
}

export interface GetSensorDataParams {
  sensorId: string;
  since: number;
  until: number;
}

export interface CreateSensorThreshold {
  threshold: number;
}
