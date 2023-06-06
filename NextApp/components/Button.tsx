"use client";
import React from "react";

type Props = React.ComponentProps<"button"> & { className?: string };

function Button(props: Props) {
  return (
    <button
      {...props}
      className={`bg-secondary text-accent py-4 px-8 m-8 drop-shadow-accent-light dark:drop-shadow-accent-bold rounded-md ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
