import type { Accessor } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";

export type Validator<
  Type extends string | string[] | number | number[] | null
> = (value: Type) => boolean;
export interface FieldValidate<
  Type extends string | string[] | number | number[] | null
> {
  validators: Validator<Type>[];
  value: Accessor<Type>;
}

export interface ValidateAuthConfigBase<
  Mode extends "login" | "register" = "login" | "register"
> {
  mode: Mode;
  email: FieldValidate<string>;
  password: FieldValidate<string>;
  confirmPassword?: FieldValidate<string>;
}

export interface ValidateLoginConfig extends ValidateAuthConfigBase<"login"> {
  confirmPassword?: never;
}

export interface ValidateRegisterConfig
  extends ValidateAuthConfigBase<"register"> {
  confirmPassword: FieldValidate<string>;
}

export type ValidateAuthConfig<
  Mode extends "login" | "register" = "login" | "register"
> = Mode extends "login" ? ValidateLoginConfig : ValidateRegisterConfig;

export interface ValidationStateBase {
  email: boolean;
  password: boolean;
  confirmPassword?: boolean;
}

export interface LoginValidationState extends ValidationStateBase {
  confirmPassword?: never;
}

export interface RegisterValidationState extends ValidationStateBase {
  confirmPassword: boolean;
}

export type ValidationState<
  Mode extends "login" | "register" = "login" | "register"
> = Mode extends "login" ? LoginValidationState : RegisterValidationState;

export interface ValidateAuth<
  Mode extends "login" | "register" = "login" | "register"
> {
  valid: ValidationState<Mode>;
  touched: ValidationState<Mode>;
  setTouched: SetStoreFunction<ValidationState<Mode>>;
  validate: () => void;
}

export function validateAuth<
  Mode extends "login" | "register" = "login" | "register"
>(config: ValidateAuthConfig<Mode>): ValidateAuth<Mode> {
  const [valid, setValid] = createStore<ValidationState<Mode>>({
    email: false,
    password: false,
    confirmPassword: config.mode === "login" ? undefined : false,
  } as ValidationState<Mode>);

  const [touched, setTouched] = createStore<ValidationState<Mode>>({
    email: false,
    password: false,
    confirmPassword: config.mode === "login" ? undefined : false,
  } as ValidationState<Mode>);

  const validate = () => {
    const emailValidity = config.email.validators
      .map((validate) => validate(config.email.value()))
      .filter((v) => !v);
    const passwordValidity = config.password.validators
      .map((validate) => validate(config.password.value()))
      .filter((v) => !v);
    let confirmPasswordValidity = undefined;

    if (config.mode === "register") {
      confirmPasswordValidity = config.confirmPassword.validators
        .map((validate) => validate(config.confirmPassword.value()))
        .filter((v) => !v);
    }

    setValid({
      email: emailValidity.length > 0 ? false : true,
      password: passwordValidity.length > 0 ? false : true,
      confirmPassword:
        confirmPasswordValidity !== undefined &&
        confirmPasswordValidity.length > 0
          ? false
          : true,
    } as ValidationState<Mode>);
  };

  return {
    valid,
    touched,
    setTouched,
    validate,
  };
}

