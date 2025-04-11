const requstMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };
  
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
  }) => {
    const options = {
      method,
      credentials: "include" as RequestCredentials,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        ...header,
      },
      body,
      signal,
      redirect,
    };
    if (method === requstMethod.GET) {
      delete options.body;
    }
    return await fetch(`${url}`, options);
  };