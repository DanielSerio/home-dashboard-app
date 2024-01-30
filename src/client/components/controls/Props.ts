import type { Accessor, Setter } from "solid-js";

export interface BaseInputProps {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id: string;
  value: Accessor<string>;
  setValue: Setter<string>;
}

