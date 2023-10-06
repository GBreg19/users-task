import { Alert, AlertTitle } from "@/components/ui/alert";

interface AlertProps {
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertMessage = ({ setFunc }: AlertProps) => {
  return (
    <div>
      <div
        onClick={() => setFunc(false)}
        className="fixed top-0 left-0 w-full h-full z-40 bg-white/[0.1] backdrop-blur-sm"
      ></div>
      <Alert className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-6 shadow-lg duration-200 flex flex-col gap-5 rounded-lg text-center">
        <AlertTitle>User deleted successfully!</AlertTitle>
      </Alert>
    </div>
  );
};

export default AlertMessage;
