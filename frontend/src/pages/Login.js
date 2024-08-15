import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    navigate('/client-login');
  };

  const handleAgenceLogin = () => {
    navigate('/agence-login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header text-center bg-primary text-white">
              <h3 className="mb-0">Login</h3>
              <small className="text-white-50">Choose your login type</small>
            </div>
            <div className="card-body p-4">
              <p className="text-center lead">Select the type of account you want to log in to:</p>
              <div className="d-grid gap-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleClientLogin}
                >
                  Login as Client
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={handleAgenceLogin}
                >
                  Login as Agence
                </button>
              </div>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">Don't have an account? <a href="/signup">Sign up here</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
