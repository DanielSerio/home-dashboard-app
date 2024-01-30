import jwt, { type JwtPayload } from "jsonwebtoken";
import type { User, UserRoles } from "../../db/entities/user.entity";
const { sign: signJWT, verify: verifyJWT } = jwt;
export interface JWTUtilityConfig {
  SECRET: string;
  EXPIRES: string;
}

export interface JWTUtility<PayloadType extends object> {
  sign: (payload: PayloadType) => Promise<string>;
  verify: (token: string) => Promise<(PayloadType & JwtPayload) | null>;
}

export interface UserPayloadObject {
  eml: string;
  unm: string | null;
  hue: number;
  rol: UserRoles;
  sub: number;
  cdt: Date | string;
  udt: Date | string | null;
}

export interface PayloadTransform {
  userToPayload(user: User): UserPayloadObject;
  payloadToUser(payload: UserPayloadObject): Omit<User, "account_pass">;
}

export function getJWTUtility<PayloadType extends object = UserPayloadObject>(
  config: JWTUtilityConfig
): JWTUtility<PayloadType> {
  async function sign(payload: PayloadType): Promise<string> {
    return await signJWT(payload, config.SECRET, {
      algorithm: "HS256",
      expiresIn: config.EXPIRES,
    });
  }

  async function verify(
    token: string
  ): Promise<(PayloadType & JwtPayload) | null> {
    const result = await verifyJWT(token, config.SECRET);
    if (result && typeof result === "object") {
      return result as PayloadType & JwtPayload;
    }
    return null;
  }

  return {
    sign,
    verify,
  };
}

export function getPayloadTransform(): PayloadTransform {
  function userToPayload(user: User): UserPayloadObject {
    return {
      sub: user.id,
      cdt: user.created_at,
      udt: user.updated_at,
      eml: user.email,
      unm: user.username,
      hue: user.hue,
      rol: user.account_role,
    };
  }

  function payloadToUser(
    payload: UserPayloadObject
  ): Omit<User, "account_pass"> {
    return {
      id: payload.sub,
      created_at: payload.cdt,
      updated_at: payload.udt,
      email: payload.eml,
      username: payload.unm,
      hue: payload.hue,
      account_role: payload.rol,
    };
  }

  return {
    userToPayload,
    payloadToUser,
  };
}

