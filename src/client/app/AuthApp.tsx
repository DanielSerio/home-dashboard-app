import { createSignal, type Component, createMemo, Show } from "solid-js";
import { AppShell } from "../components/AppShell";
import { FormControl } from "../components/forms/FormControl";
import { PasswordInput } from "../components/controls/PasswordInput";
import {
  validateAuth,
  type ValidateLoginConfig,
  type ValidateRegisterConfig,
} from "../hooks/validate-auth";

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
  const { setTouched, touched, valid, validate } = validateAuth({
    mode: trueMode(),
    email: {
      validators: [(v: string) => v.length > 0],
      value: emailValue,
    },
    password: {
      validators: [(v: string) => v.length > 0],
      value: passwordValue,
    },
    confirmPassword: {
      validators: [(v: string) => v === passwordValue()],
      value: confirmPasswordValue,
    },
  } as ValidateLoginConfig | ValidateRegisterConfig);

  const submitIsDisabled = createMemo(() => {
    if (!touched.email || !touched.password) return true;
    if (!valid.email || !valid.password) return true;
    if (props.mode === "register") {
      if (!touched.confirmPassword) return true;
      if (!valid.confirmPassword) return true;
    }
    if (formIsSubmitting()) return true;
    return false;
  });

  const getChangeListener = (name: string) => {
    return (event: Event) => {
      const target = event.target as HTMLInputElement;

      if (name === "confirmPassword") {
        setConfirmPasswordValue(target.value);
        validate();
      } else if (name === "password") {
        setPasswordValue(target.value);
        validate();
      } else if (name === "email") {
        setEmailValue(target.value);
        validate();
      }
    };
  };

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
      <form onSubmit={handleSubmit}>
        <div class="body">
          <FormControl
            error={
              touched.email
                ? !valid.email
                  ? "Invalid Email Address"
                  : null
                : null
            }
          >
            <input
              type="email"
              name="email"
              id="email"
              value={emailValue()}
              onFocus={() => setTouched("email", true)}
              onChange={getChangeListener("email")}
            />
            <label for="email">Email</label>
          </FormControl>
          <FormControl
            error={
              touched.password
                ? !valid.password
                  ? "Password must be at least 6 characters"
                  : null
                : null
            }
          >
            <PasswordInput
              id="password"
              onTouched={() => setTouched("password", true)}
              value={passwordValue}
              onChange={getChangeListener("password")}
            />
            <label for="password">Password</label>
          </FormControl>
          <Show when={trueMode() === "register"}>
            <FormControl
              error={
                touched.confirmPassword
                  ? !valid.confirmPassword
                    ? "Passwords do not match"
                    : null
                  : null
              }
            >
              <PasswordInput
                id="confirmPassword"
                onTouched={() => setTouched("confirmPassword", true)}
                value={confirmPasswordValue}
                onChange={getChangeListener("confirmPassword")}
              />
              <label for="confirmPassword">Confirm Password</label>
            </FormControl>
          </Show>
        </div>
        <div class="links">
          <a href={`?mode=${trueMode() === "register" ? "login" : "register"}`}>
            {trueMode() === "register" ? "Already" : "Don't"} have an account?
          </a>
        </div>
        <footer>
          <button type="submit" disabled={submitIsDisabled()}>
            {trueMode()}
          </button>
        </footer>
      </form>
    </AppShell>
  );
};

