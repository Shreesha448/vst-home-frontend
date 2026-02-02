import { useAuth } from "../auth/AuthContext.jsx";

const MockLogin = () => {
  const { login } = useAuth();

  return (
    <div className="login-page">
      <h2>Company Intranet Login</h2>
      <button onClick={login}>
        Login with Company Account
      </button>
    </div>
  );
};

export default MockLogin;
