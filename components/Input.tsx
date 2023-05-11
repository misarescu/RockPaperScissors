import React from "react";

type Props = React.ComponentProps<"input">;

const Input = React.forwardRef(
  (props: Props, ref: React.LegacyRef<HTMLInputElement>) => {
    return <input className="block w-full" {...props} ref={ref} />;
  }
);

Input.displayName = "Input";

export default Input;
