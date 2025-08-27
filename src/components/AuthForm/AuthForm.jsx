import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "./AuthForm.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";
import toast from "react-hot-toast";

const AuthForm = () => {

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Handles form submission for both login and registration.
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (isRegistering) {
      if (email === '' || password === '') {
        toast.error("Please fill in all fields.")
        return;
      }

      const config = {
        headers: {
          'X-API-Key': 'a7bS3pG9zQjR2vYwE5u8x!A%D*G-KaPd'
        }
      };

      const registerPromise = axios.post('https://api.priyank.space/api/v1/client/register', {
        name,
        email,
        password,
      }, config)
      // .then((response) => {
      //   console.log(response);
      //   setIsLoading(false);
      //   setIsRegistering(false);
      //   // setMessage('Registration successful! Redirecting to login...');
      // })
      // .catch((error) => {
      //   console.error('Registration error:', error);
      //   setError(error.response.data.msg)
      //   setIsLoading(false)
      // });


      toast.promise(registerPromise, {
        loading: 'Creating your account...',
        success: (response) => {
          setIsRegistering(false); // Switch to login form on success
          setIsLoading(false);
          return <b>Account created! Please log in.</b>;
        },
        error: (error) => {
          setIsLoading(false);
          if (error.status == 409) {
            setIsRegistering(false);
          }
          return <b>{error.response?.data?.msg || 'Registration failed.'}</b>;
        }
      });
    } else {
      if (email === '' || password === '') {
        toast.error("Please fill in all fields.")
        return;
      }

      const config = {
        headers: {
          'X-API-Key': 'a7bS3pG9zQjR2vYwE5u8x!A%D*G-KaPd'
        }
      };

      const loginPromise = axios.post('https://api.priyank.space/api/v1/client/login', {
        email,
        password,
      }, config)
      // .then((res) => {
      //   localStorage.setItem("token", res.data.token);
      //   dispatch(login(res.data.user))
      //   setIsLoading(false)
      //   setMessage('Login successful! Redirecting to dashboard...');
      //   navigate('/dashboard');
      //   console.log(res);
      // })
      // .catch((error) => {
      //   console.error('Registration error:', error);
      //   setError(error.response.data.msg);
      //   setIsLoading(false)
      // });

      toast.promise(loginPromise, {
        loading: 'Logging in...',
        success: (response) => {
          localStorage.setItem("token", response.data.token);
          dispatch(login(response.data.user));
          setIsLoading(false)
          navigate('/dashboard');
          return <b>Login successful!</b>;
        },
        error: (error) => {
          setIsLoading(false)
          return <b>{error.response?.data?.msg || 'Login failed.'}</b>;
        }
      });
    }
  };

  return (
    <div className="auth-form-container">
      <div className="backdrop-background"></div>
      <div className="auth-card-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="confirm-password">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? <BeatLoader color="#fff" /> : isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <p className="toggle-text">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <span
              className="toggle-link"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? ' Login here' : ' Register here'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm