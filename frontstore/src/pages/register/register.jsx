import { useState , useContext} from "react";
import "./register.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUser } = useContext(FormContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const passwordConfirm = formData.get("passwordConfirm");
      const response = await apiRequest.post(
        "/auth/signup",
        {
          name,
          email,
          password,
          passwordConfirm
        }
      );
     
      console.log("User signed up successfully:", response.data);
      await fetchUser();
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="body-sign">
      <div className="center-sign mb-3">
        <a href="/homepage" className="logo float-start">
          <img src="img/astra2.png" width={150} alt="astra" />
        </a>
        <div className="panel card-sign">
          <div className="card-title-sign mt-3 text-end">
            <h2 className="title text-uppercase font-weight-bold m-0">
              <i className="bx bx-user-circle me-1 text-6 position-relative top-5" />{" "}
              Register
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>E-mail Address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Password Confirmation</label>
                    <input
                      name="passwordConfirm"
                      type="password"
                      className="form-control form-control-lg"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="checkbox-custom checkbox-default">
                    <input id="AgreeTerms" name="agreeterms" type="checkbox" />
                    <label htmlFor="AgreeTerms">
                      I agree with <a href="#">terms of use</a>
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 text-end">
                  <button
                    type="submit"
                    className="btn btn-primary mt-2"
                    style={{ marginLeft: "20px" }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="alert alert-danger mt-3">
                  <strong>Error:</strong> {errorMessage}
                </div>
              )}
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
                Already have an account? <a href="/login">Login!</a>
              </p>
            </form>
          </div>
        </div>
        <p className="text-center text-muted mt-3 mb-3">
          © Copyright 2023. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

export default Register;
