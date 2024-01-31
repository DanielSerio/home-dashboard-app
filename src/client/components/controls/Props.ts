import type { Accessor, Setter } from "solid-js";

export interface BaseInputProps {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id: string;
  value: Accessor<string>;
  setValue: Setter<string>;
}

export interface PasswordInputProps {
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id: string;
  value: Accessor<string>;
  onChange: (e: Event) => void;
  onTouched?: () => void;
}

