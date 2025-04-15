import { env } from "@/src/config";
import { apiHandler } from "@/src/utils";

export const fetchUsersAPI = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<Response> => {
  return await apiHandler({
    url: `${env.apiHost}/api/v1/user-getAll`,
    method: "GET",
    signal,
    header: {
      "Content-Type": "application/json",
    },
  });
};

export const createUserAPI = async ({
  signal,
  userData,
}: {
  signal?: AbortSignal;
  userData: Pick<User, "name">;
}): Promise<Response> => {
  return await apiHandler({
    url: `${env.apiHost}/api/v1/user-create`,
    method: "POST",
    signal,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const updateUserAPI = async ({
  signal,
  userData,
}: {
  signal?: AbortSignal;
  userData: Pick<User, "name" | "id">;
}): Promise<Response> => {
  return await apiHandler({
    url: `${env.apiHost}/api/v1/user-update/${userData.id}`,
    method: "POST",
    body: JSON.stringify(userData),
    header: {
      "Content-Type": "application/json",
    },
    signal,
  });
};
export const deleteUserAPI = async ({
  signal,
  userId,
}: {
  signal?: AbortSignal;
  userId: number;
}): Promise<Response> => {
  return await apiHandler({
    url: `${env.apiHost}/api/v1/user-delete/${userId}`,
    method: "DELETE",
    signal,
    header: {
      "Content-Type": "application/json",
    },
  });
};
