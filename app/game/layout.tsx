type Props = {};

function CreateGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-4/5 h-4/5 bg-primary dark:bg-primary-dark flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default CreateGameLayout;
