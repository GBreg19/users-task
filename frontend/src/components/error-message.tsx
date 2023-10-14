type ErrorProps = {
  errorMessage: string;
};

const ErrorMessage = ({ errorMessage }: ErrorProps) => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-white">Oops!</h1>
      <p className="text-white">Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorMessage;
