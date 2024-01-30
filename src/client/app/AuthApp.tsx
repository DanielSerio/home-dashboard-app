import { createSignal, type Component, createMemo, Show } from "solid-js";
import { AppShell } from "../components/AppShell";
import { FormControl } from "../components/forms/FormControl";
import { PasswordInput } from "../components/controls/PasswordInput";

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
        <div class="body">
          <FormControl>
            <input type="email" name="email" id="email" value={emailValue()} />
            <label for="email">Email</label>
          </FormControl>
          <FormControl>
            <PasswordInput
              id="password"
              value={passwordValue}
              setValue={setPasswordValue}
            />
            <label for="password">Password</label>
          </FormControl>
          <Show when={trueMode() === "register"}>
            <FormControl>
              <PasswordInput
                id="confirmPassword"
                value={confirmPasswordValue}
                setValue={setConfirmPasswordValue}
              />
              <label for="confirmPassword">Confirm Password</label>
            </FormControl>
          </Show>
        </div>
        <footer>
          <div class="links">
            <a
              href={`?mode=${trueMode() === "register" ? "login" : "register"}`}
            >
              {trueMode() === "register" ? "Already" : "Don't"} have an account?
            </a>
          </div>
          <button type="submit">{trueMode()}</button>
        </footer>
      </form>
    </AppShell>
  );
};

