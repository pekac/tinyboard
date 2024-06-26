"use client";

import { Button, Checkbox, Popover, Stack } from "@mantine/core";
import { IconCaretDown } from "@tabler/icons-react";
import { useState } from "react";

import { colors } from "@/utils";

export interface IVendorSources {
  vendors: { vendorid: number }[];
  vendorSources: number[];
}

export function VendorSources({
  vendors,
  vendorSources: initialVendorSources,
}: IVendorSources) {
  const [selectedVendors, setSelectedVendors] =
    useState<number[]>(initialVendorSources);

  const handleVendorToggle = (vendorId: number) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId],
    );
  };

  return (
    <Popover
      clickOutsideEvents={["mouseup", "touchend"]}
      keepMounted={true}
      position="bottom-start"
      shadow="md"
      width={200}
    >
      <Popover.Target>
        <Button rightSection={<IconCaretDown size={14} />} variant="outline">
          Vendor Sources ({selectedVendors.length})
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack className="p-2 gap-y-4">
          {vendors.map(({ vendorid: id }) => (
            <Checkbox
              checked={selectedVendors.includes(id)}
              color={colors[id - 1]}
              key={id}
              label={`Vendor ${id}`}
              name="vendors"
              onChange={() => handleVendorToggle(id)}
              value={id.toString()}
            />
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
