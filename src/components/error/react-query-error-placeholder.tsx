import { AlertTriangle } from "lucide-react";

type QueryError = {
  message?: string;
};

interface ReactQueryErrorPlaceholderProps {
  error: QueryError;
}

export const ReactQueryErrorPlaceholder = ({
  error,
}: ReactQueryErrorPlaceholderProps) => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-8 md:p-12">
        <AlertTriangle className="h-12 w-12 text-destructive" />

        <p className="text-center text-body-md text-gray-100">
          Oops! We've encountered a problem.
        </p>

        {error?.message && (
          <p className="mt-1 text-center text-body-md text-gray-100">
            <b>Error:</b> {error.message}
          </p>
        )}
      </div>
    </div>
  );
};
