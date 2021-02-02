import { ReactNode } from "react";

export interface Cell {
  value: unknown;
  name: unknown;
  label: ReactNode;
  component: string;
  required: boolean;
}