export async function queryGraphql<T>(
  operationName: string,
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const authToken = localStorage.getItem("@anime-skip/authToken");

  const res = await fetch("/api/graphql", {
    headers: {
      "content-type": "application/json",
      "X-Client-ID": "ZGfO0sMF3eCwLYf8yMSCJjlynwNGRXWE",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: JSON.stringify({
      operationName,
      query: query.trim(),
      variables,
    }),
    method: "POST",
  });
  const json = await res.json();

  if (json.errors?.[0]) throw Error(json.errors[0].message);
  return json.data;
}
