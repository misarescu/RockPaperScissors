"use client";

type Props = React.ComponentProps<"form">;

function Form(props: Props) {
  const submitFunction: typeof props.onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit ? props.onSubmit(e) : null;
  };
  return (
    <form
      // don't do the default behaviour
      onSubmit={submitFunction}
    >
      {props.children}
    </form>
  );
}

export default Form;
