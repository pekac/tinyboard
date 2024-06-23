export interface IRide {
  vendorid: number;
  tpep_pickup_datetime: string;
  tpep_dropoff_datetime: string;
  passenger_count: number;
  trip_distance: number;
  ratecodeid: number;
  store_and_fwd_flag: string;
  pulocationid: number;
  dolocationid: number;
  payment_type: number;
  fare_amount: string;
  extra: number;
  mta_tax: number;
  tip_amount: number;
  tolls_amount: number;
  improvement_surcharge: number;
  total_amount: number;
}

const stringKeysMap = new Map<keyof IRide, boolean>([
  ["tpep_pickup_datetime", true],
  ["tpep_dropoff_datetime", true],
  ["store_and_fwd_flag", true],
  ["fare_amount", true],
]);

export function getIRidePropType(key: keyof IRide): "string" | "number" {
  return stringKeysMap.has(key) ? "string" : "number";
}
