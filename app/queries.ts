export const GetMetadataQuery = `SELECT * FROM _ LIMIT 1`;

export const GetVendorsQuery = `SELECT DISTINCT vendorid FROM _`;

export const GetTotalSumPerVendorQuery = `SELECT DATE(tpep_pickup_datetime) AS date,
       SUM(CASE WHEN vendorid=1 THEN total_amount ELSE 0 END) AS total_amount1,
       SUM(CASE WHEN vendorid=2 THEN total_amount ELSE 0 END) AS total_amount2
      FROM _ GROUP BY DATE(tpep_pickup_datetime) ORDER BY DATE(tpep_pickup_datetime) ASC`;
