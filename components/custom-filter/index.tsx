"use client";

import { TextInput, Popover, Button, Select, Stack } from "@mantine/core";
import { IconCaretDown } from "@tabler/icons-react";

import { ComparisonOperator, blacklistedFieldsMap } from "@/utils";
import { IRide } from "@/models";
import { IMeta } from "@/app/actions";

export interface ICustomFilter {
  cmpField?: keyof IRide;
  cmp?: ComparisonOperator;
  cmpValue?: string;
  metadata: IMeta[];
}

export function CustomFilter({
  metadata,
  cmpField,
  cmp,
  cmpValue,
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
        <Button rightSection={<IconCaretDown size={14} />} variant="outline">
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
