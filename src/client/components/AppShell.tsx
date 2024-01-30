import { type ParentComponent } from "solid-js";

export interface ShellConfig {
  route: string;
}

export const AppShell: ParentComponent<ShellConfig> = (props) => {
  return (
    <div classList={{ "app-shell": true, [props.route]: true }}>
      {props.children}
    </div>
  );
};

