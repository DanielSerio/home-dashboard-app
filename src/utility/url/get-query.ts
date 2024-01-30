export interface QueryParams {
  [k: string]: number | boolean | string | null;
}

export function getQuery<Type extends QueryParams = QueryParams>(
  url: string
): null | Type {
  const [base, query] = url.split("?");

  if (!query) return null;

  const toEntry = (value: string): [string, string] =>
    value.split(/[=]/g) as [string, string];
  const chunks = query.split(/[&]/g);
  const params: QueryParams = {};

  const parse = (value: string): number | boolean | string | null => {
    const val = `${value}`.trim();
    if (!val.length || val.toLowerCase() === "null") return null;
    if (["true", "false"].includes(val.toLowerCase()))
      return JSON.parse(val.toLowerCase());
    if (!isNaN(+val)) return +val;
    return val;
  };

  for (const chunk of chunks) {
    const [key, value] = toEntry(chunk);
    params[key] = parse(value);
  }

  return params as unknown as Type;
}

