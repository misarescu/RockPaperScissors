"use client";
import React from "react";

type Props = React.ComponentProps<"button">;

function Button(props: Props) {
  return (
    <button
      {...props}
      className="bg-secondary text-accent py-4 px-8 m-8 hover:py-6 hover:px-10 hover:m-6 drop-shadow-accent-light dark:drop-shadow-accent-bold rounded-md"
    >
      {props.children}
    </button>
  );
}

export default Button;
