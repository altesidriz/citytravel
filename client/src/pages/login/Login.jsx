import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./login.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: "" }));
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!credentials.username) {
      tempErrors.username = "Username is required";
      isValid = false;
    }

    if (!credentials.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        let errorMessage = "Login failed"; // Default error message

        try {
          // Attempt to parse JSON error message from the server
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // If JSON parsing fails, use the default message
          if (res.status === 404){
            errorMessage = "Server endpoint not found. Please check the API configuration.";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      dispatch({ type: "LOGIN_SUCCESS", payload: data.details });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.lContainer}>
        {error && <span className={styles.errorMessage}>{error}</span>}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className={styles.lInput}
        />
        {errors.username && <span className={styles.error}>{errors.username}</span>}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className={styles.lInput}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
        <button disabled={loading} onClick={handleClick} className={styles.lButton}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;