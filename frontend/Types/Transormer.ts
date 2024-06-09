export interface Transformer {
  _id: string;
  city: string;
  streetAddress: string;
  location: string;
  status: string;
  sensorId: string;
  healthPercentile: string;
  installationDate: {
    $date: string;
  };
  assignedTechnician: string;
  registeredBy: {
    $oid: string;
  };
  sensorData: string[];
  __v: number;
}

export interface SensorData {
  _id: string;
  temperature: string;
  current: string;
  oilLevel: string;
  date: string;
  transformerId: string;
}
