"use client";

import { Box, Divider, Group, Paper, Stack, Text } from "@mantine/core";

export interface IChartTooltip {
  label: string;
  payload: Record<string, any>[] | undefined;
}

export function ChartTooltip({ label, payload }: IChartTooltip) {
  if (!payload) return null;

  return (
    <Paper
      className="md:w-[315px]"
      px="md"
      py="sm"
      radius="md"
      shadow="md"
      withBorder
    >
      <Text fw={500} mb={5}>
        {label}
      </Text>
      <Stack>
        {payload.map((item: any, i: number) => (
          <>
            <Box
              className="flex flex-col md:flex-row md:justify-between"
              key={item.name}
            >
              <Group>
                <Box
                  className="w-[12px] h-[12px] rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text fz="sm">{item.name}</Text>
              </Group>
              <Text className="pl-7 md:pl-0" fz="sm">
                {item.value.toFixed(2)}
              </Text>
            </Box>
            {i < payload.length - 1 && (
              <Divider className="md:hidden" variant="dashed" />
            )}
          </>
        ))}
      </Stack>
    </Paper>
  );
}
