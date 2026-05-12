import { useRouteError } from "react-router-dom";

function Error({ message }) {
  const errorFromRoute = useRouteError();
  return (
    <div className="h-screen overflow-auto">
      🔥🔥🔥An error occured with below message {message}: ⚠⚠⚠{" "}
      {errorFromRoute.data || errorFromRoute.message}
    </div>
  );
}

export default Error;
