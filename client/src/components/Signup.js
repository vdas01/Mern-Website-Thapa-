import React,{useState} from 'react';
import { NavLink , useNavigate} from 'react-router-dom';



const Signup = () => {
  const Navigate = useNavigate();
const [user,setUser] = useState({
  name:"",
  email:"",
  phone:"",
  work:"",
  password:"",
  cpassword:""
});

const handleInputs = (e)=>{
  
   setUser({...user, [e.target.name]:e.target.value})
}

const PostData =async (e)=>{
    e.preventDefault();
    const {name,email,phone,work,password,cpassword} = user;
    const res = await fetch('http://localhost:4000/register',{
      method:'post',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword
      })
    });
  
    // console.log(res);
    const data = await res.json();
    // console.log(data);

    if(res.status === 422 || !data){
      window.alert(`${data.error}`);
      console.log("Invalid Registration");
    }
    else{
      window.alert(`${data.message}`);
      console.log("Successfull Registration");
      Navigate('/login');
    }
}

  return (
    <>
       <section className="signup">
         <div className="container mt-5">
              <div className="signup-content">
                   <div className='signup-form'>
                       <h2 className="form-title">Sign up</h2>
                       <form method='POST' className='register-form' id='register-form'>
                          <div className="form-group">
                            <label htmlFor="name">
                            <i className="zmdi zmdi-account material-icons-name"></i>
                            </label>
                            <input type="text" name="name" id="name" placeholder='Your name' autoComplete='off' value={user.name} onChange={handleInputs}/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="email">
                            <i className="zmdi zmdi-email material-icons-name"></i>
                            </label>
                            <input type="text" name="email" id="email" placeholder='Your Email' autoComplete='off' value={user.email} onChange={handleInputs}/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="phone">
                            <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                            </label>
                            <input type="number" name="phone" id="phone" placeholder='Your phone' autoComplete='off' value={user.phone} onChange={handleInputs}/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="work">
                            <i className="zmdi zmdi-slideshow material-icons-name"></i>
                            </label>
                            <input type="text" name="work" id="work" placeholder='Your Profession' autoComplete='off' value={user.work} onChange={handleInputs}/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="password">
                            <i className="zmdi zmdi-lock material-icons-name"></i>
                            </label>
                            <input type="password" name="password" id="password" placeholder='Your Password' autoComplete='off' value={user.password} onChange={handleInputs}/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="cpassword">
                            <i className="zmdi zmdi-lock material-icons-name"></i>
                            </label>
                            <input type="password" name="cpassword" id="cpassword" placeholder='Confirm your Password' autoComplete='off' value={user.cpassword} onChange={handleInputs}/>
                          </div>

                          <div className="form-group form-button">
                             <input type="submit" name="signup"  id='signup' className='form-submit' value="register" onClick={PostData}/>
                          </div>
                       </form>

                       <div className="signup-image">
                            <figure>
                                 <img src="" alt="registration-pic" />
                            </figure>
                            <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                       </div> 
                   </div>
              </div>
         </div>
       </section>
    </>
  )
}

export default Signup