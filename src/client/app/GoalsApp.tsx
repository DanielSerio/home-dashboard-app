import { createSignal, type Component } from "solid-js";
import { AppShell } from "../components/AppShell";
import AppNavigation, {
  type AppNavigationTabProps,
} from "../components/navigation/AppNavigation";
import { DashboardPage } from "./goals/DashboardPage";
import { GoalsPage } from "./goals/GoalsPage";
import { CategoriesPage } from "./goals/CategoriesPage";
import { createStore } from "solid-js/store";

export const GoalsApp: Component<{}> = (props) => {
  const [count, setCount] = createStore({ value: 0 });
  const NAV_TABS: AppNavigationTabProps[] = [
    {
      icon: "dashboard",
      text: "Dashboard",
      id: "dash",
      component: DashboardPage,
    },
    {
      icon: "tag",
      text: "Goals",
      id: "goals",
      component: GoalsPage,
      componentProps: {
        count,
      },
    },
    {
      icon: "tag",
      text: "Categories",
      id: "categories",
      component: CategoriesPage,
      componentProps: {
        count,
        setCount,
      },
    },
  ];
  return (
    <AppShell route="goals">
      <AppNavigation tabs={NAV_TABS} />
    </AppShell>
  );
};

