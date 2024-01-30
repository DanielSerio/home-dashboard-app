import type { APIRoute } from "astro";
import { User, type UserUpdate } from "../../../db/entities/user.entity";
import { createErrorResponse } from "../../../utility/error/create-error-response";
import { getEnv } from "../../../env/get-env";
import { getDataSource } from "../../../db/data-source";
import { getJWTUtility } from "../../../utility/jwt/get-jwt-utility";

const env = getEnv();
const AppDataSource = await getDataSource({
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASS,
});
const userRepo = AppDataSource.getRepository(User);

const jwt = getJWTUtility({
  SECRET: env.JWT_SECRET,
  EXPIRES: env.JWT_EXPIRES,
});

const sanitizeHue = (hue: number): number => {
  let basis = ~~hue;

  if (basis < 0) return 0;
  if (basis > 359) return basis % 360;
  return basis;
};

const authError = () => {
  const err = new Error("Unauthorized");
  err.name = "AuthError";
  return {
    name: err.name,
    message: err.message,
    stack: err.stack,
    status: 401,
  };
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const authHeader = await request.headers.get("Authorization");
    const token = authHeader?.replace(/^bearer\s/i, "") ?? null;

    if (token === null) {
      throw authError();
    }
    const payload = await jwt.verify(token);
    if (!payload) {
      throw authError();
    }
    const user = await userRepo.findOne({ where: { email: payload.eml } });

    if (!user) {
      throw authError();
    }

    const { account_pass, ...userResult } = user;

    return new Response(JSON.stringify(userResult), {
      status: 200,
    });
  } catch (e) {
    return await createErrorResponse(e);
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const body = (await request.json()) as UserUpdate;

  try {
    const authHeader = await request.headers.get("Authorization");
    const token = authHeader?.replace(/^bearer\s/i, "") ?? null;

    if (token === null) {
      throw authError();
    }
    const payload = await jwt.verify(token);
    if (!payload) {
      throw authError();
    }
    const user = await userRepo.findOne({ where: { email: payload.eml } });

    if (!user) {
      throw authError();
    }

    if (body.hue) {
      user.hue = sanitizeHue(+body.hue);
    }

    if (body.username) {
      user.username = body.username;
    }

    const { account_pass, ...userResult } = await userRepo.save(user);

    return new Response(JSON.stringify(userResult), {
      status: 200,
    });
  } catch (e) {
    return await createErrorResponse(e);
  }
};

