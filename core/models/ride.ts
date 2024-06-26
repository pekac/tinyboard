export interface IRide {
  dolocationid: number;
  extra: number;
  fare_amount: string;
  improvement_surcharge: number;
  mta_tax: number;
  passenger_count: number;
  payment_type: number;
  pulocationid: number;
  ratecodeid: number;
  store_and_fwd_flag: string;
  tip_amount: number;
  tolls_amount: number;
  total_amount: number;
  tpep_dropoff_datetime: string;
  tpep_pickup_datetime: string;
  trip_distance: number;
  vendorid: number;
}

const stringKeysMap = new Map<keyof IRide, boolean>([
  ["fare_amount", true],
  ["store_and_fwd_flag", true],
  ["tpep_dropoff_datetime", true],
  ["tpep_pickup_datetime", true],
]);

export function getIRidePropType(key: keyof IRide): "number" | "string" {
  return stringKeysMap.has(key) ? "string" : "number";
}
