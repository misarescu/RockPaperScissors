import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "@/components/Button";
import WelcomePage from "@/components/WelcomePage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <WelcomePage />;
}
