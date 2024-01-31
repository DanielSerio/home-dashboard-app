import {
  createSignal,
  type Component,
  type ParentComponent,
  type Setter,
  For,
  createMemo,
} from "solid-js";
import Icon from "../icons/Icon";
import { Dynamic } from "solid-js/web";

export interface AppNavigationTabProps {
  id: string;
  icon: string;
  text: string;
  component: Component<any>;
  componentProps?: object;
}

const AppNavigationTab: Component<{
  tab: AppNavigationTabProps;
  setActiveTab: Setter<string>;
  isActive: boolean;
}> = (props) => {
  return (
    <button
      type="button"
      classList={{
        tab: true,
        active: props.isActive,
      }}
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
    return (
      <Dynamic
        component={props.tabs[index].component}
        {...props.tabs[index].componentProps}
      />
    );
  });
  return (
    <div class="app-navigation">
      <div class="screen">{activeComponent()}</div>
      <footer>
        <For each={props.tabs}>
          {(tab) => (
            <AppNavigationTab
              isActive={activeTabID() === tab.id}
              tab={tab}
              setActiveTab={setActiveTabID}
            />
          )}
        </For>
      </footer>
    </div>
  );
};

export default AppNavigation;

