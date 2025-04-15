export const apiHandler = async ({
  url,
  method,
  header = {},
  body,
  signal,
  redirect = "manual",
}: {
  url: string;
  method: string;
  header?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
  redirect?: RequestRedirect;
}): Promise<Response> => {
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      ...header,
    },
    body,
    signal,
    redirect,
  };

  if (method === "GET") {
    delete options.body;
  }

  return await fetch(url, options);
};
