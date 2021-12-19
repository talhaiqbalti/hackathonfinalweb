import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./tabs.css"

import {storage, db, auth} from "../../../firebase"
import { uploadBytes, ref  } from 'firebase/storage';
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged  } from 'firebase/auth';

export default function Manager() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [pass, setpass] = useState()
    const [state, setstate] = useState("")

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              const uid = user.uid;
             
            } else {
              Navigate("/")
            }
          });
        
    }, [])

    const Navigate = useNavigate()

    function namech(event){
        setname(event.target.value)
    }
    function emailch(event){
        setemail(event.target.value)
    }
    function passch(event){
        setpass(event.target.value)
    }
    
 
  

    function upload(){
         
        createUserWithEmailAndPassword(auth, email, pass )
        .then((userCredential) => {
          
          const user = userCredential.user;
          alert("hold a second")
          setDoc(doc(db, "users", user.uid), {
            resuid: user.uid,
            name: name,
            email: email,
            role: "manager",
          }).then(()=>{
            alert("Account Created")
            Navigate("/dashboard")
          }).catch((e)=>{
            alert(e.message)
          })

         
          
               
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Please Try Later",errorMessage)
          alert(errorMessage)


    })
}
    return (
        <div>
             {/* Navigation */}
             <nav class="navbar navbar-expand-lg navbar-dark bg-success ">
                <a class="navbar-brand">&nbsp;&nbsp;&nbsp;Khana Sab ke liye</a>
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                        <a class="nav-link" onClick={()=> Navigate("/dashboard")}>Request</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link " onClick={()=> Navigate("/accepted")}>Accpetd or Rejected</a>
                    </li>
                    <li class="nav-item ">
                        <a class="nav-link active" onClick={()=> Navigate("/")}>Manager Account</a>
                    </li>
                  
                </ul>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                 <form class="form-inline my-2 my-lg-0">
                 <button class="btn btn-primary my-2 my-sm-0 buttonc" onClick={()=>{
                     
                     signOut(auth).then(() => {
                     
                       alert("ok")
                       setstate("hi")
                       
                     }).catch((error) => {
                      alert("some thing went wrong")
                     });
                 }}  >Log Out</button>
                 </form>
         </nav>



         <div className="container">
        <div className='hello'>
            <div className="form-group">
                <label for="exampleFormControlInput1">Name :</label>
                <input type="text" className="form-control" id="name" onChange={namech}/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlTextarea1">Email :</label>
                <input type="text" className="form-control" id="email" onChange={emailch} />
            </div>
            <div className="form-group">
                <label for="exampleFormControlSelect1"> Password:</label>
                <input type="password" className="form-control" id="pass" onChange={passch} />
            </div>
    
       
            <div>
                <button className="btn btn-outline-success btn-lg btn-block " style={{margin: "10px"}} onClick={upload}>Create</button>
            </div>
        </div>

    </div>

        </div>
    )
}
