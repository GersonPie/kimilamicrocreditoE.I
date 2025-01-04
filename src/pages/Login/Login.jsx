import { useContext, useEffect, useState } from 'react'
import { db, auth, provider } from '../../config/firebase'
import { signInWithPopup, signInWithCredential, onAuthStateChanged } from 'firebase/auth'
import { AppContext } from '../../App'
import './Login.css'
import { assets } from '../../assets/assets'
import { addDoc, collection, doc, getDocs, Timestamp, updateDoc } from 'firebase/firestore'


const Login = () => {

  const {go_to_page, data} = useContext(AppContext)
  const [admin_allowed, setAdmin_allowed] = useState(null)
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [canRefresh, setCanRefresh] = useState(true)

  const {admins} = data;

  useEffect(()=>{
    console.log(canRefresh ? 'can refresh' : 'can´t refresh')
    
  }, [canRefresh])
  
  useEffect(()=>{
    admins.map(admin=>{
      if(admin.email === auth?.currentUser?.email){
        if(admin.permission){
          setCanRefresh(true);
        }
      }
    })
    
  }, [admins])

  useEffect(()=>{
    if(!admin_allowed){
      
      var existsInDB = false;
      admins.map((admin,index)=>{
        if(admin.email === auth?.currentUser?.email){
          existsInDB = true;
        }

      })
      if(!existsInDB){
        
        if(auth?.currentUser?.email !== undefined){
          add_adm_request(auth?.currentUser?.email)
          alert("requisição a Adm feita")
        }
      }
      else console.log('exists in DB')
    }
  }, [admin_allowed])


  const log = ()=>{
    if(canRefresh){

      admins.map(admin =>{
        //console.log("times ran")
        admin.permission ? console.log(`allowed admins`, admin.email) : "";
        if(admin.email === auth?.currentUser?.email){
          if(admin.permission){
            setAdmin_allowed(true);
            setCanRefresh(false);
            updateDoc(doc(db, 'admins', admin.firestoreID),{
              lastLog: Timestamp.fromDate(new Date())
            })
            setAdminLoggedIn(true);
            return setTimeout(()=>go_to_page("boot"),2000)
            
          }
          else {
            alert("o seu email está pendente")
            setCanRefresh(false);
          }
        }
        else{
          setAdmin_allowed(false)
        }
  
      })
    }
    
  }
    
    onAuthStateChanged(auth, (user)=>{
      if(user && auth.authStateReady && canRefresh && !adminLoggedIn) log()
    })
  const add_adm_request = async(admemail)=>{
    await addDoc(collection(db,'admins'),{
      id: new Date().getTime(),
      date: Timestamp.fromDate(new Date),
      email: admemail,
      name: auth?.currentUser?.displayName,
      permission: false
    })
    console.log("A requisição para ser Adm foi enviada")
    
  }
  const handleSubmit = async()=>{
    try{
      await signInWithPopup(auth, provider)
    }
    catch (err){
      console.log(err)
    }

  }
  
  return (
      


    <div className="login-page">

        <form action="/" method='post' className='login-form' onSubmit={(e)=>e.preventDefault()}>
            <img onClick={handleSubmit} className='google-logo' src={assets.google_logo} alt="" />
            <h1>{auth?.currentUser?.displayName ? `Olá ${auth?.currentUser?.displayName}` : "Login"}</h1>
            

            <p className="recuperar-conta">Clique aqui para contactar <br/>o <a href="#">administrador</a></p>
        </form>
    </div>
  )
}

export default Login