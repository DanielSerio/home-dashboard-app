import { createSignal, type Component } from "solid-js";
import type { BaseInputProps } from "./Props";
import Icon from "../icons/Icon";

export const PasswordInput: Component<BaseInputProps> = (props) => {
  const [textIsVisible, setTextIsVisible] = createSignal(false);
  return (
    <div class="control-wrap">
      <input
        type={textIsVisible() ? "text" : "password"}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      <button
        type="button"
        class="control-button"
        onClick={() => setTextIsVisible((v) => !v)}
      >
        <Icon name={`eye${textIsVisible() ? "-off" : ""}-outline`} />
      </button>
    </div>
  );
};

