import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'Take your rock paper scissors game to the next level'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary dark:bg-primary-dark text-primary-text dark:text-primary-text-dark dark:text-primary-dark">
        <nav className="flex flex-row justify-center w-full">
          <div>Play the best version of rock paper scissors</div>
        </nav>
        {children}
      </body>
    </html>
  );
}
