import { AuthRoute, ProtectedRoute } from "../util/route";

export default () => (
    <>
      <Route exact path="/" component={Welcome} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
    </>
  );