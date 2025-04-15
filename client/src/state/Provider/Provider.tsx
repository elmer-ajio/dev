"use client";
import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";
import store from "../store/store";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Provider;