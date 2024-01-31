import { type Accessor, type Component, type Setter } from "solid-js";
import { TabPage } from "../../components/navigation/TabPage";
import type { StoreSetter } from "solid-js/store";

export const CategoriesPage: Component<{
  count: { value: number };
  setCount: StoreSetter<{ value: number }>;
}> = (props) => {
  const handleClick = () => {
    console.log({ count: props.count, setCount: props.setCount });
    (props.setCount as any)("value", props.count.value + 1);
  };
  return (
    <TabPage>
      <h1>Categories: {JSON.stringify(props.count)}</h1>

      <button onClick={handleClick}>add</button>
    </TabPage>
  );
};

