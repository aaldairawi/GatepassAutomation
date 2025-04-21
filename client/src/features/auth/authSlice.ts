import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBillingUser } from "../../app/users/billingEmployees";

interface IAuthSliceState {
  authObject: IBillingUser;
  loggedIn: boolean;
  userNameInLocalStorage: string;
}

const initialState: IAuthSliceState = {
  authObject: { username: "", role: "" },
  loggedIn: false,
  userNameInLocalStorage: "N/A",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setUserInLocalStorage: (state, action: PayloadAction<IBillingUser>) => {      
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("role", action.payload.role);

      state.authObject.username = action.payload.username;
      state.authObject.role = action.payload.role;
      state.loggedIn = true;
    },
    removeUserFromLocalStorage: (state) => {
      localStorage.removeItem("username");
      localStorage.removeItem("role");

      state.authObject.username = "";
      state.authObject.role = "";
      state.loggedIn = false;
    },
    getUserInLocalStorage: (state) => {
      const userNameInStorage = localStorage.getItem("username");
      const userRoleInStorage = localStorage.getItem("role");
      
      if (userNameInStorage && userRoleInStorage) {
        state.authObject = {
          username: userNameInStorage,
          role: userRoleInStorage,
        };
        state.loggedIn = true;
      }
    },
  },
});

export const {
  setUserInLocalStorage,
  removeUserFromLocalStorage,
  getUserInLocalStorage,
} = authSlice.actions;
