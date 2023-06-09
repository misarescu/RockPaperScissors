"use client";

import { GameRoomType } from "@/types/GameRoom";
import React, { Dispatch, createContext, useReducer } from "react";

export type ActionType =
  | {
      type: "UPDATE";
      payload: GameRoomType;
    }
  | {
      type: "RESET";
    };

const initialState: GameRoomType = {
  id: "",
  name: "",
  playerLimit: 0,
  playerName: "",
  playerList: [],
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

export const RoomContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const RoomContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};
