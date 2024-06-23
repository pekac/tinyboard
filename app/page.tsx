import { ParsedUrlQuery } from "querystring";
import { LineChart } from "@mantine/charts";
import { Button, Container, Group, Stack } from "@mantine/core";

import { BaseFilters, VendorSources } from "@/components";

import {
  ComparisonOperator,
  GetMetadataQuery,
  GetVendorsQuery,
  IRide,
  SqlFunction,
  queryBuilder,
} from "@/core";

import { CustomFilter } from "@/components";

import { colors } from "@/utils";

import { getData, applyFilters } from "./actions";

/**
 * TODO(pekac):
 * - remove unused deps
 * - eslint
 * - husky push & commit
 * */
interface HomeSearchParams extends ParsedUrlQuery {
  cmp?: ComparisonOperator;
  cmpField?: keyof IRide;
  cmpValue?: string;
  fn?: SqlFunction;
  field?: keyof IRide;
  vendors?: string | string[];
}

export default async function Home({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  const {
    cmp,
    cmpField,
    cmpValue,
    fn = SqlFunction.SUM,
    field = "total_amount",
    vendors = ["2", "1"],
  } = searchParams;

  const [metadataResponse, vendorsResponse] = await Promise.all([
    getData({
      query: GetMetadataQuery,
    }),
    getData({
      query: GetVendorsQuery,
    }),
  ]);

  const vendorIds = Array.isArray(vendors)
    ? vendors.map((id) => parseInt(id))
    : [parseInt(vendors)];
  const query = queryBuilder({
    cmp,
    cmpField,
    cmpValue,
    fn,
    field,
    vendors: vendorIds,
  });
  const { data, error } = await getData({ query });

  if (error || metadataResponse.error || vendorsResponse.error) {
    throw new Error("Error fetching data. Check your .env file!");
  }

  const { data: ridesInfo, meta } = data;
  return (
    <Container size="lg">
      <Stack>
        <form action={applyFilters}>
          <Group className="items-end justify-between">
            <Group className="gap-x-4">
              <BaseFilters
                field={field}
                fn={fn}
                metadata={metadataResponse.data.meta}
              />
              <VendorSources
                vendors={vendorsResponse.data.data}
                vendorSources={vendorIds}
              />
              <CustomFilter
                cmp={cmp}
                cmpField={cmpField}
                cmpValue={cmpValue}
                metadata={metadataResponse.data.meta}
              />
            </Group>
            <Button type="submit">Apply filters</Button>
          </Group>
        </form>
        <Group>
          <LineChart
            h={300}
            data={ridesInfo}
            dataKey="date"
            series={meta
              .filter((m) => m.name !== "date")
              .map(({ name }, i) => ({
                name,
                color: colors[vendorIds[i] - 1],
              }))}
            xAxisLabel="Date"
            yAxisLabel={field}
          />
        </Group>
      </Stack>
    </Container>
  );
}
