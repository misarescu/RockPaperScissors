import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

function StyledLink(props: Props) {
  return (
    <Link
      href={props.href}
      className="bg-secondary text-accent py-4 px-8 m-8 hover:py-6 hover:px-10 hover:m-6 drop-shadow-accent-light dark:drop-shadow-accent-bold rounded-md"
    >
      {props.children}
    </Link>
  );
}

export default StyledLink;
