import type { APIRoute } from "astro";
import { User, type UserCreate } from "../../../db/entities/user.entity";
import { createErrorResponse } from "../../../utility/error/create-error-response";
import bcrypt from "bcryptjs";
import { getEnv } from "../../../env/get-env";
import { getDataSource } from "../../../db/data-source";

const { hashSync } = bcrypt;

const env = getEnv();
const AppDataSource = await getDataSource({
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASS,
});
const userRepo = AppDataSource.getRepository(User);

export const POST: APIRoute = async ({ request }) => {
  const body = (await request.json()) as UserCreate;
  try {
    const user = new User();
    user.email = body.email;
    user.account_pass = await hashSync(body.password);
    await userRepo.save(user);
    return new Response(null, { status: 200 });
  } catch (e) {
    return await createErrorResponse(e);
  }
};

