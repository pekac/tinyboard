"use client";

import { LineChart } from "@mantine/charts";
import { Box, ScrollArea } from "@mantine/core";

import { IMeta, IRide } from "@/core";
import { colors } from "@/utils";
const height = 300;

export interface IScrollableLineChart {
  data: IRide[];
  dataKey: string;
  meta: IMeta[];
  vendorIds: number[];
}

export function ScrollableLineChart({
  data,
  dataKey,
  meta,
  vendorIds,
}: IScrollableLineChart) {
  return (
    <ScrollArea.Autosize mah={height} type="scroll">
      <Box className="min-w-[380px]">
        <LineChart
          data={data}
          dataKey={dataKey}
          h={height}
          legendProps={{ height: 50, verticalAlign: "bottom" }}
          series={meta
            .filter((m) => m.name !== "date")
            .map(({ name }, i) => ({
              color: colors[vendorIds[i] - 1],
              name,
            }))}
          withLegend
        />
      </Box>
    </ScrollArea.Autosize>
  );
}
