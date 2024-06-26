import { IRide } from "../models";
import { IQueryBuilder, queryBuilder } from "./builder";
import { ComparisonOperator, SqlFunction } from "./enums";

describe("queryBuilder", () => {
  const baseQuery: IQueryBuilder = {
    field: "total_amount",
    fn: SqlFunction.SUM,
    vendors: [1, 2],
  };

  test("builds default query correctly", () => {
    const result = queryBuilder(baseQuery);
    expect(result).toBe(
      "SELECT DATE_FORMAT(tpep_pickup_datetime, '%b %d') AS date, " +
        "SUM(CASE WHEN vendorid=1 THEN total_amount ELSE 0 END) AS total_amount_vendor_1," +
        "SUM(CASE WHEN vendorid=2 THEN total_amount ELSE 0 END) AS total_amount_vendor_2 " +
        "FROM _ " +
        "GROUP BY DATE_FORMAT(tpep_pickup_datetime, '%b %d') " +
        "ORDER BY DATE_FORMAT(tpep_pickup_datetime, '%b %d') ASC",
    );
  });

  test("handles COUNT function correctly", () => {
    const query = { ...baseQuery, fn: SqlFunction.COUNT };
    const result = queryBuilder(query);
    expect(result).toContain(
      "SUM(CASE WHEN vendorid=1 THEN 1 ELSE 0 END) AS total_amount_vendor_1",
    );
  });

  test("applies comparison operator correctly", () => {
    const query = {
      ...baseQuery,
      cmp: ComparisonOperator.GT,
      cmpField: "passenger_count" as keyof IRide,
      cmpValue: "2",
    };
    const result = queryBuilder(query);
    expect(result).toContain(
      "WHEN vendorid=1 AND passenger_count>2 THEN total_amount ELSE 0 END",
    );
  });

  test("handles multiple vendors correctly", () => {
    const query = { ...baseQuery, vendors: [1, 2, 3] };
    const result = queryBuilder(query);
    expect(result).toContain("AS total_amount_vendor_1");
    expect(result).toContain("AS total_amount_vendor_2");
    expect(result).toContain("AS total_amount_vendor_3");
  });

  test("uses correct SQL function", () => {
    const query = { ...baseQuery, fn: SqlFunction.AVG };
    const result = queryBuilder(query);
    expect(result).toContain(
      "AVG(CASE WHEN vendorid=1 THEN total_amount ELSE 0 END)",
    );
  });

  test("handles string comparison correctly", () => {
    const query = {
      ...baseQuery,
      cmp: ComparisonOperator.EQ,
      cmpField: "store_and_fwd_flag" as keyof IRide,
      cmpValue: "Y",
    };
    const result = queryBuilder(query);
    expect(result).toContain("AND store_and_fwd_flag=Y");
  });

  test("handles numeric comparison correctly", () => {
    const query = {
      ...baseQuery,
      cmp: ComparisonOperator.LTE,
      cmpField: "trip_distance" as keyof IRide,
      cmpValue: "10.5",
    };
    const result = queryBuilder(query);
    expect(result).toContain("AND trip_distance<=10.5");
  });

  test("omits comparison when not all comparison fields are provided", () => {
    const query = {
      ...baseQuery,
      cmp: ComparisonOperator.GT,
      // missing cmpField and cmpValue
    };
    const result = queryBuilder(query);
    expect(result).not.toContain("AND");
  });
});
