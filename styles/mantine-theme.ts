"use client";
import { createTheme, virtualColor } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: virtualColor({
      dark: "gray",
      light: "dark",
      name: "primary",
    }),
  },
  defaultRadius: "md",
  primaryColor: "primary",
});
