import type { IMark } from "@/stores/accounts";

export const getMarkAsString = (mark: IMark[]) => {
  return mark.map((item) => item.text).join(";");
};

export const parseMarks = (mark: string, split: string) => {
  return mark
    .split(split)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ text }));
};
