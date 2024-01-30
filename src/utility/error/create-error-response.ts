export function createErrorResponse<BasisType = unknown>(
  e: BasisType,
  status: number = 500
) {
  const err = e as Error & { status?: number };
  const error = new Error(err.message) as Error & { status?: number };
  const statusConcrete = err.status ?? status;
  error.name = err.name;
  error.stack = err.stack;
  error.status = statusConcrete;
  return new Response(JSON.stringify(error), { status: statusConcrete });
}
