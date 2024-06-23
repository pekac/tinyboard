import { IRide, getIRidePropType } from "../models";

import { ComparisonOperator, SqlFunction } from "./enums";

export const blacklistedFieldsMap = new Map<string, boolean>([
  ["vendorid", true],
  ["tpep_pickup_datetime", true],
  ["tpep_dropoff_datetime", true],
]);

export interface IQueryBuilder {
  cmp?: ComparisonOperator;
  cmpField?: keyof IRide;
  cmpValue?: string;
  field: keyof IRide;
  fn: SqlFunction;
  vendors: number[];
}

export function queryBuilder({
  cmp,
  cmpField,
  cmpValue,
  field,
  fn,
  vendors,
}: IQueryBuilder): string {
  const applyFn = fn === SqlFunction.COUNT ? SqlFunction.SUM : fn;
  const fieldValue = fn === SqlFunction.COUNT ? 1 : field;

  const conditionPartialQuery = createConditionPartialQuery({
    cmp,
    cmpField,
    cmpValue,
  });

  const appliedSqlFnPartialQuery = vendors
    .map((id) => {
      return `${applyFn}(CASE WHEN vendorid=${id} ${conditionPartialQuery}THEN ${fieldValue} ELSE 0 END) AS ${field}_vendor_${id}`;
    })
    .join(",");

  return `SELECT DATE(tpep_pickup_datetime) AS date, ${appliedSqlFnPartialQuery}
        FROM _ GROUP BY DATE(tpep_pickup_datetime) ORDER BY DATE(tpep_pickup_datetime) ASC`;
}

function createConditionPartialQuery({
  cmp,
  cmpField,
  cmpValue,
}: Partial<IQueryBuilder>): string {
  if (!cmp || !cmpField || !cmpValue) {
    return "";
  }

  const fieldType = getIRidePropType(cmpField);
  const fieldValue = fieldType === "number" ? parseFloat(cmpValue) : cmpValue;

  return `AND ${cmpField}${cmp}${fieldValue} `;
}
