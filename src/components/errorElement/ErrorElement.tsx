import { useRouteError } from "react-router";

function ErrorElement() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex justify-center">
      <h4 className="font-bold text-4xl">there was an error</h4>
    </div>
  );
}

export default ErrorElement;
