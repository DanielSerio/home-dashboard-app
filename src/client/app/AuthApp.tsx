import { type Component } from "solid-js";
import { AppShell } from "../components/AppShell";

export const AuthApp: Component<{}> = (props) => {
  return (
    <AppShell route="auth">
      <h1>Auth</h1>
    </AppShell>
  );
};

