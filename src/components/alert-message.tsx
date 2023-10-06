import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAppSelector } from "@/store/hooks";

const AlertMessage = () => {
  const { successMessage, errorMessage } = useAppSelector(
    (state) => state.users
  );

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full z-40 bg-white/[0.1] backdrop-blur-sm"></div>
      <Alert className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-6 shadow-lg duration-200 flex flex-col gap-5 rounded-lg text-center">
        {successMessage && <AlertTitle>{successMessage}</AlertTitle>}
        {errorMessage && <AlertTitle>{errorMessage}</AlertTitle>}
      </Alert>
    </div>
  );
};

export default AlertMessage;
