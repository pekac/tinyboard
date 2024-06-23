"use client";

import { Stack, Text } from "@mantine/core";

export default function ErrorComponent({
  error,
}: {
  error: { digest?: string } & Error;
}) {
  return (
    <Stack className="text-center text-red-500">
      <Text className="font-bold text-xl" component="h1">
        Something went wrong!
      </Text>
      <Text>{error.message}</Text>
    </Stack>
  );
}
