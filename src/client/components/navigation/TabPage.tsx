import { type ParentComponent } from "solid-js";

export const TabPage: ParentComponent<{}> = (props) => {
  return <div class="tab-page">{props.children}</div>;
};

