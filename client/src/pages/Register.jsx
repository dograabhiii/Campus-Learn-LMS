import { useState } from 'react';
import LoginImg from '../assets/login.png';
import API from '../services/api';
import { Link } from 'react-router-dom';


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e)=>{
    e.preventDefault();

    const formData ={
      name,
      email,
      password,
      role
    };
    // console.log(formData)

    fetch ("http://localhost:5000/api/auth/register",{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData)
    })
    .then((res=> res.json())) 
    .then((data => {
      console.log(data);
      {
        if(data.message){
          alert(data.message);
          window.location.href="/login";
        }
      }
    }))
    .catch(err =>{
      console.error(err);
      {
        if(err.message){
          alert(err.message);
        }
      }
    })
  }
  
  return (
    <div>
      <div className="LoginImg">
        <div className="login-form">
          <h1 className="text-5xl">Sign Up</h1>
          <p className='text-gray-500'>Create your account to get Started!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" placeholder="Full Name" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <input type="email" placeholder="Email" 
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
            <div>
              <input type="password" placeholder="Password"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className='selectrole'> 
              <select 
              onChange={(e)=>setRole(e.target.value)}
              value={role}
              > 
                <option value="student">Select Role</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select> 
            </div>
            <p className='text-right text-sm text-blue-900 cursor-pointer'>Forgot Password?</p>
            <button type='submit'>Sign Up</button>
          </form>
            <p className='border-t border-gray-400'></p>
            <p className='text-gray-400 text-center'>Already have an account? 
            <Link to="/login" className='text-blue-900 cursor-pointer'> Login</Link>
            </p>
            <button onClick={()=> alert("oops! Something went wrong!")} className='googleLogin'>Sign in with Google</button>

        </div>

      </div>
    </div>
  );
};

export default Register;