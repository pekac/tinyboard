"use client";

import { Popover, Button, Select, Stack } from "@mantine/core";
import { IconCaretDown } from "@tabler/icons-react";

import { blacklistedFieldsMap, IRide, SqlFunction } from "@/core";

import { IMeta } from "@/app/actions";

export interface IBaseFilters {
  field: keyof IRide;
  fn: SqlFunction;
  metadata: IMeta[];
}

export function BaseFilters({ field, fn, metadata }: IBaseFilters) {
  return (
    <Popover
      clickOutsideEvents={["mouseup", "touchend"]}
      keepMounted={true}
      position="bottom-start"
      shadow="md"
      width={250}
      withinPortal={false}
    >
      <Popover.Target>
        <Button rightSection={<IconCaretDown size={14} />} variant="outline">
          Base Filters
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack className="p-2 gap-y-4">
          <Select
            checkIconPosition="right"
            clearable
            comboboxProps={{ withinPortal: false }}
            data={metadata
              .filter((m) => !blacklistedFieldsMap.has(m.name))
              .map((m) => m.name)}
            defaultValue={field}
            label="Data field"
            name="field"
            placeholder="amount"
            wrapperProps={{
              withinPortal: false,
            }}
          />
          <Select
            checkIconPosition="right"
            clearable
            comboboxProps={{ withinPortal: false }}
            data={Object.values(SqlFunction)}
            defaultValue={fn}
            label="SQL function"
            name="fn"
            placeholder="SUM"
          />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
