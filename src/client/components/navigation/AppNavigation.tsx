import {
  createSignal,
  type Component,
  type ParentComponent,
  type Setter,
  For,
  createMemo,
} from "solid-js";
import Icon from "../icons/Icon";

export interface AppNavigationTabProps {
  id: string;
  icon: string;
  text: string;
  component: Component<any>;
}

const AppNavigationTab: Component<{
  tab: AppNavigationTabProps;
  setActiveTab: Setter<string>;
}> = (props) => {
  return (
    <button
      type="button"
      class="tab"
      onClick={() => props.setActiveTab(props.tab.id)}
    >
      <span class="icon">
        <Icon name={props.tab.icon} />
      </span>
      <span class="text">{props.tab.text}</span>
    </button>
  );
};

const AppNavigation: ParentComponent<{ tabs: AppNavigationTabProps[] }> = (
  props
) => {
  const [activeTabID, setActiveTabID] = createSignal(props.tabs[0].id);
  const activeComponent = createMemo(() => {
    const index = props.tabs.findIndex((t) => t.id === activeTabID());
    return props.tabs[index].component({});
  });
  return (
    <div class="app-navigation">
      <div class="screen">{activeComponent()}</div>
      <footer>
        <For each={props.tabs}>
          {(tab) => (
            <AppNavigationTab tab={tab} setActiveTab={setActiveTabID} />
          )}
        </For>
      </footer>
    </div>
  );
};

export default AppNavigation;

