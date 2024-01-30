import { Show, type ParentComponent } from "solid-js";

export interface FormControlProps {
  inline?: boolean;
  error?: string | null;
  class?: string;
}

export const FormControl: ParentComponent<FormControlProps> = (props) => {
  const getClassList = () => {
    if (props.class) {
      return {
        "form-control": true,
        error: !!props.error,
        inline: props.inline,
        [props.class]: true,
      };
    }
    return {
      "form-control": true,
      error: !!props.error,
      inline: props.inline,
    };
  };
  return (
    <div classList={getClassList()}>
      <Show when={props.error}>
        <small class="control-error">{props.error}</small>
      </Show>
      {props.children}
    </div>
  );
};

