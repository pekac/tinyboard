import { LineChart } from "@mantine/charts";
import {
  Box,
  Button,
  Container,
  Group,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { ParsedUrlQuery } from "querystring";

import {
  BaseFilters,
  CustomFilter,
  ScrollableLineChart,
  VendorSources,
} from "@/components";
import {
  ComparisonOperator,
  GetMetadataQuery,
  GetVendorsQuery,
  IRide,
  queryBuilder,
  SqlFunction,
} from "@/core";
import { colors } from "@/utils";

import { applyFilters, getData } from "./actions";

interface HomeSearchParams extends ParsedUrlQuery {
  cmp?: ComparisonOperator;
  cmpField?: keyof IRide;
  cmpValue?: string;
  field?: keyof IRide;
  fn?: SqlFunction;
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
    field = "total_amount",
    fn = SqlFunction.SUM,
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
    field,
    fn,
    vendors: vendorIds,
  });

  const { data, error } = await getData({ query });

  const anyError = error || metadataResponse.error || vendorsResponse.error;
  if (anyError) {
    throw anyError;
  }

  const { data: ridesInfo, meta } = data;
  return (
    <Container className="md:py-6" size="lg">
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
              <Button className="md:hidden" type="submit">
                Apply filters
              </Button>
            </Group>
            <Button className="hidden md:flex" type="submit">
              Apply filters
            </Button>
          </Group>
        </form>
        <ScrollableLineChart
          data={ridesInfo}
          dataKey="date"
          meta={meta}
          vendorIds={vendorIds}
        />
      </Stack>
    </Container>
  );
}
