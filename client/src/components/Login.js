import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginUser = async (e)=>{
    e.preventDefault();
    const res = await fetch('http://localhost:4000/signin',{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();
    console.log(data);
    if(res.status === 400 || !data){
       window.alert(`${data.error}`);
    }
    else{
      window.alert(`${data.message}`);
      navigate('/');
    }
  }

  return (
    <>
      <section className="signin">
        <div className="container mt-5">
          <div className="signin-content">
             <div className="signin-image">
                <figure>
                   <img src="" alt="Login pic" />
                </figure>
                <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
             </div>
            <div className="signin-form">
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" id="register-form" method="POST">
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Your Email"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    placeholder="Your Password"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log In"
                    onClick={loginUser}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
