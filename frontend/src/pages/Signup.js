import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleClientSignup = () => {
    navigate('/client-signup');
  };

  const handleAgenceSignup = () => {
    navigate('/agence-signup');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header text-center bg-primary text-white">
              <h3 className="mb-0">Choose Your Registration</h3>
            </div>
            <div className="card-body p-4">
              <p className="text-center lead">Select the type of account you want to create:</p>
              <div className="d-grid gap-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleClientSignup}
                >
                  Register as Client
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg"
                  onClick={handleAgenceSignup}
                >
                  Register as Agence
                </button>
              </div>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">Already have an account? <a href="/login">Login here</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;



