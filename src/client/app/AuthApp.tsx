import { createSignal, type Component, createMemo } from "solid-js";
import { AppShell } from "../components/AppShell";

export interface AuthAppProps {
  mode: string | "login" | "register";
}

export const AuthApp: Component<AuthAppProps> = (props) => {
  const [formIsSubmitting, setFormIsSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal<null | Error>(null);
  const [emailValue, setEmailValue] = createSignal("");
  const [passwordValue, setPasswordValue] = createSignal("");
  const [confirmPasswordValue, setConfirmPasswordValue] = createSignal("");

  const trueMode = createMemo<"login" | "register">(() =>
    !props.mode || !["login", "register"].includes(props.mode)
      ? "login"
      : (props.mode as "login" | "register")
  );

  async function login() {}

  async function register() {}

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setFormIsSubmitting(true);
    try {
      if (trueMode() === "register") {
        await login();
      } else {
        await register();
      }
      setSubmitError(null);
    } catch (error) {
      setSubmitError(error as Error);
    } finally {
      setFormIsSubmitting(false);
    }
  }

  return (
    <AppShell route="auth">
      <h1>SerioHome</h1>
      <form onSubmit={handleSubmit}>
        <div class="body"></div>
        <footer>
          <button type="submit">{trueMode()}</button>
        </footer>
      </form>
    </AppShell>
  );
};

