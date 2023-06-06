import React from "react";

type Props = React.ComponentProps<"input">;

const Input = React.forwardRef(
  (props: Props, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <input
        className="block w-full bg-secondary dark:bg-secondary-dark text-primary-text dark:text-primary-text-dark"
        {...props}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
