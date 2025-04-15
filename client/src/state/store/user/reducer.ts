import { UserState } from "@/@types/UserState";
import { USER_EVENT_TYPE } from "./userEventType";

const initialState: {
  userData: {
    loading: boolean;
    userList: User[];
  };
} = {
  userData: {
    loading: true,
    userList: [],
  },
};

const userReducer = (
  state = initialState,
  { type, payload }: StateAction
): UserState => {
  switch (type) {
    case USER_EVENT_TYPE.FETCH_USERS:
      return {
        ...state,
        userData: payload,
      };

    case USER_EVENT_TYPE.DELETE_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          userList: state.userData.userList.filter(
            (user) => user.id !== payload.id
          ),
        },
      };
    case USER_EVENT_TYPE.CREATE_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          userList: [payload, ...state.userData.userList],
        },
      };
    case USER_EVENT_TYPE.UPDATE_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          userList: state.userData.userList.map((user) =>
            user.id === payload.id ? { ...user, ...payload } : user
          ),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
