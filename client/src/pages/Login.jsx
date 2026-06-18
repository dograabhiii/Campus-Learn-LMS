import { useState } from 'react';
import LoginImg from '../assets/login.png';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await login(email, password);

    if (res.success) {

    const user = JSON.parse(
      localStorage.getItem("user")
    );
    alert("Login successful");
    // instructor login
    if (user.role === "instructor") {
      navigate("/instructor");
    }
    // student login
    else {
      navigate("/dashboard");
    }
  } else {
    alert(res.message);
  }
  };

  return (
    <div>
      <div className="LoginImg">
        <div className="login-form">
          <h1 className="text-5xl">Login</h1>
          <p className='text-gray-500'>Welcome back Please login with your account</p>
          <form onSubmit={handleLogin}>
            <div>
              <input type="email" placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input type="password" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className='text-right text-sm text-blue-900 cursor-pointer'>Forgot Password?</p>
            <button type="submit">Login</button>
          </form>
          <p className='border-t border-gray-400'></p>
          <p className='text-gray-400 text-center'>Don't have an account?
          <Link to="/register" className='text-blue-900 cursor-pointer'> Sign Up</Link>
          </p>
          <button onClick={()=> alert("oops! Something went wrong")} className='googleLogin'>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;