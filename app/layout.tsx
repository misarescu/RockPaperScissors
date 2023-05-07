import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rock Paper Scissors',
  description: 'Take your rock paper scissors game to the next level',
};

const navText = 'Play the best version of 🪨 🧻 ✂️';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-primary dark:bg-primary-dark text-primary-text dark:text-primary-text-dark text-5xl font-black font-sans'>
        <nav className='flex flex-row justify-center items-center w-full pt-2 pb-2 mb-2 bg-secondary drop-shadow-accent-bold dark:drop-shadow-accent-light'>
          <p className='drop-shadow-accent-light hover:drop-shadow-accent-bold text-accent'>
            {navText}
          </p>
        </nav>
        <main className='flex flex-col items-center justify-center h-screen'>
          {children}
        </main>
      </body>
    </html>
  );
}
