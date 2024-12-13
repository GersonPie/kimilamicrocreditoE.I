import { useContext, useEffect, useState } from 'react'
import { db, auth, provider } from '../../config/firebase'
import { signInWithPopup, signInWithCredential, onAuthStateChanged } from 'firebase/auth'
import { AppContext } from '../../App'
import './Login.css'
import { assets } from '../../assets/assets'
import { addDoc, collection, getDocs } from 'firebase/firestore'


const Login = () => {

  const {go_to_page} = useContext(AppContext)
  const [admin_allowed, setAdmin_allowed] = useState(null)
  const [is_admin_in_the_databsae, set_is_admin_in_the_databsae] = useState(null)
  

  useEffect(()=>{
    if(!admin_allowed){
      //alert("A requisição para ser Adm foi enviada")
      add_adm_request(auth?.currentUser?.email)
    }
  }, [admin_allowed])


    const log = async ()=>{
      try{

        const adminsQ = await getDocs(collection(db, "admins"))
        const adminData = adminsQ.docs.map((admin)=>({id: admin.ref, ...admin.data()}))
        
        adminData.map(admin =>{

          if(admin.email === auth?.currentUser?.email){
            if(admin.permission){
              setAdmin_allowed(true);
              setTimeout(()=>go_to_page("boot"),2000)
            }
            else {
              console.log("o seu email está pendente")
            }
          }
          else{
            setAdmin_allowed(false)
          }

        })
      }
      catch(err){
        console.log(err)
      }
      
    }
    onAuthStateChanged(auth, (user)=>{
      if(user && auth.authStateReady) log()
    })
  const add_adm_request = async(admemail)=>{
    const adminQ = await getDocs(collection(db, "admins"))
    const adminData = adminQ.docs.map((d)=>({
      id: d.ref,
      ...d.data()
    }));

    adminData.map((admin)=>{
      if(admin.email === auth?.currentUser?.email){
        //alert("O seu email ja foi adicionado a espera")
      }
    })
    
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