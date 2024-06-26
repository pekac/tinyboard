"use client";

import { Button, Popover, Select, Stack, TextInput } from "@mantine/core";
import { IconCaretDown } from "@tabler/icons-react";

import { blacklistedFieldsMap, ComparisonOperator, IMeta, IRide } from "@/core";

export interface ICustomFilter {
  cmp?: ComparisonOperator;
  cmpField?: keyof IRide;
  cmpValue?: string;
  metadata: IMeta[];
}

export function CustomFilter({
  cmp,
  cmpField,
  cmpValue,
  metadata,
}: ICustomFilter) {
  const inactiveFilter = !cmpField || !cmp || !cmpValue;
  return (
    <Popover
      clickOutsideEvents={["mouseup", "touchend"]}
      keepMounted={true}
      position="bottom-start"
      shadow="md"
      width={200}
      withinPortal={false}
    >
      <Popover.Target>
        <Button
          className="w-full md:w-auto"
          rightSection={<IconCaretDown size={14} />}
          variant="outline"
        >
          Add custom filter {!inactiveFilter && "(*)"}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack className="p-1 gap-y-4">
          <Select
            checkIconPosition="right"
            clearable
            comboboxProps={{ withinPortal: false }}
            data={metadata
              .filter((m) => !blacklistedFieldsMap.has(m.name))
              .map((m) => m.name)}
            defaultValue={cmpField || ""}
            label="Comparison field"
            name="cmpField"
            placeholder="total_amount"
          />
          <Select
            checkIconPosition="right"
            clearable
            comboboxProps={{ withinPortal: false }}
            data={Object.values(ComparisonOperator)}
            defaultValue={cmp}
            label="Comparison"
            name="cmp"
            placeholder="="
          />
          <TextInput
            defaultValue={cmpValue}
            label="Field value"
            name="cmpValue"
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
