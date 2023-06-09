import "./globals.css";
import { NavbarContextProvider } from "@/context/NavbarContext";
import NavBar from "@/components/NavBar";
import { RoomContextProvider } from "@/context/RoomContext";

export const metadata = {
  title: "Rock Paper Scissors",
  description: "Take your rock paper scissors game to the next level",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-300 dark:bg-slate-900 text-primary-text dark:text-primary-text-dark text-5xl font-black font-sans">
        <RoomContextProvider>
          <NavbarContextProvider>
            <NavBar />
            <main className="flex flex-col items-center justify-center h-screen">
              {children}
            </main>
          </NavbarContextProvider>
        </RoomContextProvider>
      </body>
    </html>
  );
}
