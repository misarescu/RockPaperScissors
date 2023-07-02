"use client";

import { PlayerDataType } from "@/types/PlayerData";
import React, { Dispatch, createContext, useReducer } from "react";

export type ActionType =
  | {
      type: "UPDATE";
      payload: PlayerDataType;
    }
  | {
      type: "RESET";
    };

const initialState: PlayerDataType = {
  id: "",
  name: "",
  score: 0,
};

export type StateType = typeof initialState;

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "UPDATE":
      const newState = { ...state, ...action.payload };
      console.log(`updated room state is: ${newState}`);
      return newState;
    case "RESET":
      return { ...state, ...initialState };
  }
};

export const PlayerContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
