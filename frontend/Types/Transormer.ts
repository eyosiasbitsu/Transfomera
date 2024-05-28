export interface Transformer  {
    _id: {
      $oid: string,
    },
    city: string,
    location: string;
    status: string;
    sensorId: string;
    healthPercentile: string;
    installationDate: {
      $date: string;
    },
    assignedTechnician: string;
    registeredBy: {
      $oid: string;
    },
    sensorData: string[],
    __v: number,
  }
  