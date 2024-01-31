import { type Component } from "solid-js";
import { AppShell } from "../components/AppShell";
import AppNavigation, {
  type AppNavigationTabProps,
} from "../components/navigation/AppNavigation";

const NAV_TABS: AppNavigationTabProps[] = [
  {
    icon: "dashboard",
    text: "Dashboard",
    id: "dash",
    component: () => {
      return <div>Dashboard</div>;
    },
  },
  {
    icon: "tag",
    text: "Goals",
    id: "goals",
    component: () => {
      return <div>Goals</div>;
    },
  },
];

export const GoalsApp: Component<{}> = (props) => {
  return (
    <AppShell route="goals">
      <h1>Goals</h1>
      <AppNavigation tabs={NAV_TABS} />
    </AppShell>
  );
};

