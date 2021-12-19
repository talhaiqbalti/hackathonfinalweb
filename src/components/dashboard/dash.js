import React, {useEffect, useState} from 'react'
import {auth, db} from "../../firebase"
import {onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";

 function Dash(){
    let status;
    const [Status, setStatus] = useState("")
    
    const Navigate = useNavigate()
    useEffect( () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
        
              const uid = user.uid;
              const dataSnap = await getDoc(doc(db, "users", uid))
              if(dataSnap.exists()){
                 let data = dataSnap.data();
                 if(data.role == "admin"){
                  Navigate("/dashboard")
                 }else{
                  Navigate("/notallowed")
                 }
                
              } else{
                Navigate("/")  
              }
    
    
            
            } else {
                Navigate("/")
            }
          });
    },)

   if(status = "res"){
       Navigate("/dashboard")
   }
   else if (status="user"){
       return <h1>This is a user account login from our app</h1>
    } 
    else{
        alert("login again")
    }
    
        return <h1>wait a minnute</h1>

    
}

export default Dash;