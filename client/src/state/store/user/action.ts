import { AppDispatch, State } from "../store";
import {
  deleteUserAPI,
  fetchUsersAPI,
  createUserAPI,
  updateUserAPI,
} from "./api";
import { USER_EVENT_TYPE } from "./userEventType";

export const fetchUsersAction = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response: Response = await fetchUsersAPI({ signal });
      const result: APIResponseResult<User[]> = await response.json();
      if (response.status === 200) {
        dispatch<{
          type: string;
          payload: {
            loading: boolean;
            userList: User[];
          };
        }>({
          type: USER_EVENT_TYPE.FETCH_USERS,
          payload: {
            loading: false,
            userList: result.users,
          },
        });
      }
    } catch (error) {
      //
    }
  };
};

export const createUserAction = (userData: Pick<User, "name">) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response: Response = await createUserAPI({
        signal,
        userData,
      });
      const result = await response.json();
      if (response.status === 200) {
        dispatch<{
          type: string;
          payload: User;
        }>({
          type: USER_EVENT_TYPE.CREATE_USER,
          payload: result.user,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateUserAction = (userData: Pick<User, "name" | "id">) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response: Response = await updateUserAPI({
        signal,
        userData,
      });
      await response.json();

      if (response.status === 200) {
        dispatch<{
          type: string;
          payload: Pick<User, "name" | "id">;
        }>({
          type: USER_EVENT_TYPE.UPDATE_USER,
          payload: userData,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUserAction = (userId: number) => {
  const abortController = new AbortController();
  const signal = abortController.signal;

  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      await deleteUserAPI({
        signal,
        userId,
      });

      dispatch<{
        type: string;
        payload: {
          id: number;
        };
      }>({
        type: USER_EVENT_TYPE.DELETE_USER,
        payload: {
          id: userId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};
