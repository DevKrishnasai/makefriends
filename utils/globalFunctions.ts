"use client";
import { useTheme } from "next-themes";

const GetTheme = (): String => {
  const { theme } = useTheme();
  if (!theme) return "light";
  return theme;
};

export default GetTheme;
