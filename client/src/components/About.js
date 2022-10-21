import React, { useEffect ,useState} from 'react'
import {  useNavigate } from 'react-router-dom';

const About = () => {
 const navigate = useNavigate();
 const [userData,setUserData] = useState();

  const callAboutPage = async ()=>{
    try{
         const res = fetch('http://localhost:4000/about',{
          method:"GET",
          headers:{
            // Accept:"application/json",
            "Content-Type":"application/json"
          },
          //to share cookies and tokens into bacckend
          // credentials:"include"
         });
           const data = await res.json();
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }


    }catch(err){
      console.log(err);
      navigate('/login');
    }
  }

  // useEffect(() => {
  //   callAboutPage();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
       <div className="container emp-profile">
          <form  method="GET">
             <div className="row">
                <div className="col-md-4">
                   {/* profile pic*/ }
                   <div className="profile-img">
                        <img src="" alt="" />
                   </div>
                  
                </div>

                <div className="col-md-6">
                   <h5>Vishal Das</h5>
                   <h6>Web Developer</h6>
                   <p className='profile-rating mt-3 mb-5'> RANKINGS: <span>1/10</span></p> 

                   <ul class="nav nav-tabs" role="tablist">
                     <li class="nav-item">
                        <a class="nav-link active" id='home-tab' data-toggle='tab' href="#home" role="tab">About</a>
                     </li>
                     <li class="nav-item">
                       <a class="nav-link active" id='profile-tab' data-toggle='tab' href="#home" role="tab">Timeline</a>
                     </li>
                   </ul>
                </div>
                 
                <div className="col-md-2">
                  <input type="submit" name="btnAddMore" id="" value="Edit Profile" className='profile-edit-btn'/>
                </div>
             </div>

             <div className="row">
                {/*left side url */}
               <div className="col-md-4">
                 <div className="profile-work">
                   <p>Work Link</p>
                   <a href="#" target="_thapa">Leetcode</a><br />
                   <a href="#" target="_thapa">Instagram</a><br />
                   <a href="#" target="_thapa">Medium</a><br />
                   <a href="#" target="_thapa">LinkedIn</a><br />
                   <a href="#" target="_thapa">Github</a><br />
                 </div>
               </div>

                {/*right side data toggle*/}
                 <div className="col-md-8 about-info pl-5">
                    <div className="tab-content profile-tab" id="myTabContent">
                         <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby='profile-tab'>
                          <div className="row">
                              <div className="col-md-6">
                                 <label>User ID</label>
                              </div>
                              <div className="col-md-6">
                                   <p>218981318930</p>
                              </div>
                           </div>

                           <div className="row mt-5">
                             <div className="col-md-6">
                              <label>Name</label>
                              </div>
                              <div className="col-md-6">
                                <p>Vishal Das</p>
                              </div>
                            </div>
                            
                            <div className="row mt-5">
                             <div className="col-md-6">
                              <label>Email</label>
                              </div>
                              <div className="col-md-6">
                                <p>vdas53073@gmail.com</p>
                              </div>
                            </div>

                            <div className="row mt-5">
                             <div className="col-md-6">
                              <label>Phone</label>
                              </div>
                              <div className="col-md-6">
                                <p>8457876591</p>
                              </div>
                            </div>

                            <div className="row mt-5">
                             <div className="col-md-6">
                              <label>Profession</label>
                              </div>
                              <div className="col-md-6">
                                <p>Web Developer</p>
                              </div>
                            </div>
                             
                         </div>
                    </div>
                 </div>
             </div>
          </form>
       </div>
    </>
  )
}

export default About