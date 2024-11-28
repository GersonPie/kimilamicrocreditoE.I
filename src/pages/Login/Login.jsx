import { useContext, useEffect, useState } from 'react'
import { db, auth, provider } from '../../config/firebase'
import { signInWithPopup, signInWithCredential, onAuthStateChanged } from 'firebase/auth'
import { AppContext } from '../../App'
import './Login.css'
import { assets } from '../../assets/assets'
import { collection, getDocs } from 'firebase/firestore'


const Login = () => {

  const {go_to_page} = useContext(AppContext)
  
    const log = async ()=>{
      try{

        const adminsQ = await getDocs(collection(db, "admins"))
        const adminData = adminsQ.docs.map((admin)=>({id: admin.ref, ...admin.data()}))
        console.log(adminData)
        
        adminData.map(admin =>{
          console.log(admin.email, auth?.currentUser?.displayName)
          if(admin.email === auth.currentUser?.email) setTimeout(()=>go_to_page("boot"), 1000)
          else alert("você não é admistrador, requisição para admistrador enviada para o sistema")
        })
      }
      catch(err){
        console.log(err)
      }
      
    }
    onAuthStateChanged(auth, (user)=>{
      if(user) log()
    })

  const handleSubmit = async()=>{
    try{
      const result = await signInWithPopup(auth, provider)
      if(result.user.displayName !== undefined){
        log()
      }
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