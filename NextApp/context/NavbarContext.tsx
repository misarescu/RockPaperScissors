"use client";

import React, { Dispatch, createContext, useReducer } from "react";

export type ActionType =
  | {
      type: "UPDATE";
      payload: StateType;
    }
  | {
      type: "RESET";
    };

const initialState = {
  navTitle: "Play the best version of 🪨 🧻 ✂️",
};

export type StateType = typeof initialState;

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "UPDATE":
      console.log("payload to change title is: ", action.payload.navTitle);
      return { ...state, navTitle: action.payload.navTitle };
    case "RESET":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export const NavbarContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const NavbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NavbarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};
