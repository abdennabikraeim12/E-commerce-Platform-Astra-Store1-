import { useState, useContext } from "react";
import "./login.css";
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setCurrentUser } = useContext(FormContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
    try {
      
      const response = await apiRequest.post("/auth/login", { email, password });
      setCurrentUser(response.data);
      navigate("/verify-mfa");
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="body-sign">
      <div className="center-sign">
        <a href="/" className="logo float-start">
          <img
            src="img/astra2.png"
            width={150}
            alt="astra"
            className="img-fluid"
          />
        </a>
        <div className="panel card-sign">
          <div className="card-title-sign mt-3 text-end">
            <h2 className="title text-uppercase font-weight-bold m-0">
              <i className="bx bx-user-circle me-1 text-6 position-relative top-5" />{" "}
              Login
            </h2>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Email</label>
                <div className="input-group">
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-lg"
                    required
                  />
                  <span className="input-group-text">
                    <i className="bx bx-user text-4" />
                  </span>
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <div className="input-group">
                  <input
                    name="password"
                    type="password"
                    className="form-control form-control-lg"
                    required
                  />
                  <span className="input-group-text">
                    <i className="bx bx-lock text-4" />
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="checkbox-custom checkbox-default">
                    <input id="RememberMe" name="rememberme" type="checkbox" />
                    <label htmlFor="RememberMe">Remember Me</label>
                  </div>
                </div>
                <div className="col-sm-4 text-end ">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <span className="mt-3 mb-3 line-thru text-center text-uppercase">
              <span>or</span>
            </span>
            <div className="mb-1 text-center">
              <a className="btn btn-primary mb-3 ms-1 me-1" href="#">
                Connect with{" "}
                <img
                  style={{ backgroundColor: "white", borderRadius: "2px" }}
                  width={20}
                  src="img/google.png"
                  alt="google"
                />
              </a>
            </div>
            <p className="text-center">
              Don’t have an account yet? <a href="/register">Register!</a>
            </p>
          </div>
        </div>
        <p className="text-center text-muted mt-3 mb-3">
          © Copyright 2023. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

export default Login;

