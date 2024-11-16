import { useContext, useEffect, useState } from 'react'
import { db, auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { AppContext } from '../../App'
import './Login.css'
import { assets } from '../../assets/assets'
import { collection, getDoc } from 'firebase/firestore'


const Login = () => {

  const {go_to_page} = useContext(AppContext)
  const [adminName, setAdminName] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)
  const [isShowingWarn, setIsShowingWarn] = useState(false)
  const [warnMsg, setWarnMsg] = useState("")
  
  useEffect(()=>{
    const log = async ()=>{
      const adminsQ = await getDoc(collection(db, 'admins'))
      const adminData = adminsQ.map((admin)=>({id: admin.ref, ...admin.data()}))

      adminData.map(admin =>{
        console.log(admin.email, auth?.currentUser?.displayName)
        if(admin.email === auth.currentUser.email)go_to_page("boot")
        else alert("você não é admistrador, requisição para admistrador enviada para o sistema")
      })
      
    }
    log()
  }, [auth?.currentUser?.email])

  const handleSubmit = async()=>{
    
    try{
    await signInWithPopup(auth, provider)
    
  }
  catch(err){
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