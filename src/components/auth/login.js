import React, {useState} from 'react'
import './login.css';
import { useNavigate } from 'react-router-dom';
import {auth,} from "../../firebase";
import {signInWithEmailAndPassword} from "@firebase/auth";



function Login() {

  const Navigate = useNavigate()

  const [email, setemail] = useState("")
  const [pass, setpass] = useState("")

  function emailch(event){
    setemail(event.target.value);
  }
  function passch(event){
    setpass(event.target.value);
  }

  function Loginn(){
    signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
            const user = userCredential.user;
            alert("wait a minute")
            Navigate('/Dash')
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("wrong email and password")
          });
          
  }





  return (
    <>
    {/* //nav bar */}
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary ">
          <a class="navbar-brand">&nbsp;&nbsp;&nbsp;Food App</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-warning my-2 my-sm-0 buttonc" onClick={() => Navigate("/signup")} >Create Account</button>
            </form>
        </nav>
{/* //Code for Login */}
    <div className='main'>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address:</label>
    <input type="email" className="form-control" id="InputEmail" onChange={emailch} />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password:</label>
    <input type="password" className="form-control" id="InputPassword" onChange={passch} />
  </div>
  <div className='d-grid gap-2'>
  <button  className="btn btn-outline-success btn-lg btn-block " onClick={Loginn}>LogIn</button>
  </div>
  </div>


    </>


  );
}

export default Login;