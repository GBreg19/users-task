import { Terminal, Waves } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
      <Alert className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg border bg-cyan-950 text-white p-6 shadow-lg duration-200 flex flex-col gap-5 rounded-lg">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertMessage;
