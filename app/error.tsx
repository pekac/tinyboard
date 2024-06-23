"use client";

import { Stack, Text } from "@mantine/core";

export default function ErrorComponent({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Stack className="text-center text-red-500">
      <Text component="h1" className="font-bold text-xl">
        Something went wrong!
      </Text>
      <Text>{error.message}</Text>
    </Stack>
  );
}
