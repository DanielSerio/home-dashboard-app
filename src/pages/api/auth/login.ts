import type { APIRoute } from "astro";
import {
  User,
  type UserCreate,
  type UserCred,
} from "../../../db/entities/user.entity";
import { createErrorResponse } from "../../../utility/error/create-error-response";
import bcrypt, { compareSync } from "bcryptjs";
import { getEnv } from "../../../env/get-env";
import { getDataSource } from "../../../db/data-source";
import {
  getJWTUtility,
  getPayloadTransform,
} from "../../../utility/jwt/get-jwt-utility";

const { hashSync } = bcrypt;

const env = getEnv();
const AppDataSource = await getDataSource({
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASS,
});
const userRepo = AppDataSource.getRepository(User);

const { userToPayload } = getPayloadTransform();
const jwt = getJWTUtility({
  SECRET: env.JWT_SECRET,
  EXPIRES: env.JWT_EXPIRES,
});

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json()) as UserCred;

  const createCredentialError = (
    message: string = "Invalid Credentials"
  ): Error & { status: number } => {
    const err = new Error(message);
    err.name = "CredentialError";
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      status: 401,
    };
  };

  try {
    const user = await userRepo.findOne({ where: { email: body.email } });

    if (!user) {
      throw createCredentialError();
    }
    const isValidPassword = await compareSync(body.password, user.account_pass);
    if (!isValidPassword) {
      throw createCredentialError();
    }
    const payload = await userToPayload(user);
    const token = await jwt.sign(payload);

    return new Response(null, {
      status: 200,
      headers: {
        "X-Authorization": `Bearer ${token}`,
      },
    });
  } catch (e) {
    return await createErrorResponse(e);
  }
};

