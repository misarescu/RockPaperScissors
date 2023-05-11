import Image from "next/image";
import { Inter } from "next/font/google";
import StyledLink from "@/components/StyledLink";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <StyledLink href={"/game/create"}>Create Game</StyledLink>
      <StyledLink href={"/game/join"}>Join Game</StyledLink>
    </>
  );
}
