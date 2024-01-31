import { type Accessor, type Component } from "solid-js";
import { TabPage } from "../../components/navigation/TabPage";

export const GoalsPage: Component<{ count: { value: number } }> = (props) => {
  return (
    <TabPage>
      <h1>Goals: {JSON.stringify(props.count)}</h1>
    </TabPage>
  );
};

