import { useContext, useEffect, useState } from 'react'
import { db, auth, provider } from '../../config/firebase'
import { signInWithPopup, signInWithCredential, onAuthStateChanged } from 'firebase/auth'
import { AppContext } from '../../App'
import './Login.css'
import { assets } from '../../assets/assets'
import { addDoc, collection, getDocs } from 'firebase/firestore'


const Login = () => {

  const {go_to_page} = useContext(AppContext)
  const [admin_allowed, setAdmin_allowed] = useState(false)
  
    const log = async ()=>{
      try{

        const adminsQ = await getDocs(collection(db, "admins"))
        const adminData = adminsQ.docs.map((admin)=>({id: admin.ref, ...admin.data()}))
        console.log(adminData)
        
        adminData.map(admin =>{


          if(admin.email === auth?.currentUser?.displayName){
            if(admin.permission){
              setAdmin_allowed(true);
              go_to_page("boot")
            }
            else {
              console.log("o seu email está pendente")
            }
          }
          
          // console.log(admin.email, auth?.currentUser?.displayName)
          // if(admin.email === auth.currentUser?.email && admin.permission) setTimeout(()=>go_to_page("boot"), 1000)
          // else {
          //   add_adm_request(auth.currentUser?.email)
          //   alert("você não é admistrador, requisição para admistrador enviada para o sistema")
          // }

        })
        if(!admin_allowed){
          alert("A requisićão para ser Adm foi enviada")
        }
      }
      catch(err){
        console.log(err)
      }
      
    }
    onAuthStateChanged(auth, (user)=>{
      if(user) log()
    })
  const add_adm_request = async(admemail)=>{
    await addDoc(collection(db,"admins"),{
      email: admemail,
      permission: false,
      request: "made"
    })
  }
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