/*
import { Route, Redirect } from "react-router-dom";

export default function PrivateRouter({
  component: Component,
  isPrivate,
  ...rest
}) {
  const loading = false;
  const singned = false;
  if (loading) {
    return <div></div>;
  }

  if (!singned && isPrivate) {
    return <Redirect to="/" />;
  }
  if (singned && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

*/
