import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { query, collection, onSnapshot, updateDoc, doc, where } from 'firebase/firestore';
import "../dashboard.css"
import { Button } from 'bootstrap';


export default function Dashboard() {
    const [arr, setarr] = useState([])
    
    let arrr = [ {name: 1}, {name: 1}, {name: 2} , {name: 4}]
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              const uid = user.uid;
             
            } else {
              Navigate("/")
            }
          });
         
          const q = query(collection(db, "requests"), where("accepted", "in",[  "reject", "accept"]));
          const unsubscribe = onSnapshot(q ,(snapshot)=>{ 
              snapshot.docs.map(doc=>{
                  let obj = {
                    name: doc.data().name,
                    fatherName: doc.data().fatherName,
                    noFamily : doc.data().noFamily,
                    CNIC : doc.data().CNIC,
                    dateOfBirth: doc.data().dateOfBirth,
                    dailyFood : doc.data().dailyFood,
                    monthlyIncome: doc.data().monthlyIncome,
                    accepted: doc.data().accepted,
                    uid: doc.data().uid,
                    cnicpicf: doc.data().cnicpicf,
                    cnicpicb: doc.data().cnicpicb,
                    personalpic: doc.data().personalpic,
                    nearestBranchName: doc.data().nearestBranchName,
                    nearestBranchlatitude: doc.data().nearestBranchlatitude,
                    nearestBranchlongitude: doc.data().nearestBranchlongitude,
                  }
                  setarr(oldval => [...oldval, obj])
                  
                  console.log(arr)
                  
                  console.log(arr.length)
            })

           
              
               } );
          return unsubscribe;
    }, [])
    const [state, setstate] = useState("")
    const Navigate = useNavigate()

    
    function Card (){
        if(arr.length >= 0){
         
              return(
                  <div   className="card">
                      {
                           setstate("hi")
                      }
                      {
                          arr.map((data) => {
                              console.log(data)
                             return(
                                <div style={{ marginBottom: "10%" , borderBottom: "4px solid black"}}> 
                                    <h1 className="dataNamecol">Name :</h1>
                                    <h1 className="dataName">{data.name}</h1> <br/>
                                    <h3 className='datafnamecol'>Father Name:</h3>
                                    <h3 className='fname'>{data.fatherName}</h3> <br/>
                                    <h4 className='cniccol'>CNIC:</h4>
                                    <h4 className='cnic'>{data.CNIC}</h4> <br />
                                    <p className='familycol'>No. OF Family :</p> 
                                    <p className='family'>{data.noFamily}</p>  <br />
                                    <p className='dobcol'>DOB :</p>
                                    <p className='dob'>{data.dateOfBirth}</p>  <br />
                                    <p className='foodcol'>Daily Food :</p>
                                    <p className='food'>{data.dailyFood}</p>  <br />
                                    <p className='incomecol'>Monthly Income:</p>
                                    <p className='income'>{data.monthlyIncome}</p>  <br />
                                    <p className='incomecol'>Status:</p>
                                    <p className='income'>{data.accepted}</p>  <br />

                                    <p className='uidcol'>uid</p>
                                    <p className='uid'>{data.uid}</p>  <br />
                                    <h4 className='branchcol'>Nearest Branch Name:</h4>
                                    <h4 className='branch'>{data.nearestBranchName}</h4>  <br />


                                    <h4 style={{textAlign: "center", marginTop: "2%"}}>CNIC FRONT</h4>
                                    <img style={{height: "200px"}} src={data.cnicpicf} />
                                    <h4  style={{textAlign: "center", marginTop: "2%"}} className=''>CNIC Back</h4>
                                    <img style={{height: "200px"}} src={data.cnicpicf} className='' src={data.cnicpicb} />
                                    <h4  style={{textAlign: "center", marginTop: "2%"}} className=''>Personal Pic</h4>
                                    <img style={{height: "200px"}} src={data.cnicpicf} className='' src={data.personalpic} /> <br/>
                                    <div style={{display: "flex ", margin: "20px", justifyContent: "flex-end"}}>

                                        <button style={{marginRight: "20px"} }className="btn btn-success"  onClick={()=>
                                        {
                                            const ref = doc(db, "requests", data.uid);
                                            updateDoc(ref, {
                                               accepted : "accept"
                                             }).then(()=>{
                                                 alert("accepted")
                                                 setarr([])
                                             })
                                        }
                                        }>Accept</button>
                                        <button className="btn btn-danger" id={data.uid} onClick={()=>{
                                            const ref = doc(db, "requests", data.uid);
                                            updateDoc(ref, {
                                               accepted : "reject"
                                             }).then(()=>{
                                                 alert("Rejected")
                                                 setarr([])
                                             })
                                        }}>Reject</button>
                                    </div>
                                </div>
                             ) 
                          })
                      }
                  </div>
              )
             
      
             
            
        } else{
            return <h1>Wait For Data</h1>
        }
      
    }

    return (
        <div>
              {/* Navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
                <a className="navbar-brand">&nbsp;&nbsp;&nbsp;Khana Sab ke liye</a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link " onClick={()=> Navigate("/dashboard")}>Request</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link active" onClick={()=> Navigate("/accepted")}>Accpetd or Rejected</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" onClick={()=> Navigate("/manager")}>Manager Account</a>
                    </li>
                  
                </ul>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                 <form className="form-inline my-2 my-lg-0">
                 <button className="btn btn-primary my-2 my-sm-0 buttonc" onClick={()=>{
                     
                     signOut(auth).then(() => {
                     
                       alert("ok")
                       setstate("hi")
                       
                     }).catch((error) => {
                      alert("some thing went wrong")
                     });
                 }}  >Log Out</button>
                 </form>
         </nav>
        
              <Card />
             
      
        
       
                   
            
        </div>
    )
}
