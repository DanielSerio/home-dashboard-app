import { type Component } from "solid-js";
import { AppShell } from "../components/AppShell";

export const GoalsApp: Component<{}> = (props) => {
  return (
    <AppShell route="goals">
      <h1>Goals</h1>
    </AppShell>
  );
};

