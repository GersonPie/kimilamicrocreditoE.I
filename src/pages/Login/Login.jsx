import { useContext, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore'
import { AppContext } from '../../App'
import { WarnUser } from '../../componets/warnUser'
import './Login.css'


const Login = () => {

  const {go_to_page} = useContext(AppContext)
  const [adminName, setAdminName] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)
  const [isShowingWarn, setIsShowingWarn] = useState(false)
  const [warnMsg, setWarnMsg] = useState("")
  
  useEffect(()=>{
    if(login === true){
      go_to_page("boot")
    }
  }, [login])


  


  const handleSubmit = async ()=>{
    try {
      // Reference to the collection
      const adminsCollection = collection(db, "Admins");
      
      // Create a query
      const adminQuery = query(adminsCollection, where("name", "==", adminName));
      
      // Execute the query
      const querySnapshot = await getDocs(adminQuery);
      
      // Process the results
      const adminsList = [];
      querySnapshot.forEach((doc) => {
        adminsList.push({ id: doc.id, ...doc.data() });
      });
      adminsList.map((admin)=>{
        if(admin.name === adminName && admin.password === password){
          
          setLogin(true)
        }
        else{
          warn("Dados incorrectos") 
        }
      })
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }
  function warn(msg){
          setWarnMsg(msg)
          setIsShowingWarn(true)
  }
  return (
      


    <div className="login-page">

        <form action="/" method='post' className='login-form' onSubmit={(e)=>e.preventDefault()}>
            <h1>Login</h1>
            <div className="login-sec-wrapper">
            <span className='form-text-element'>Nome do Administrador</span>
            <input value={adminName} onChange={(e)=>setAdminName(e.target.value)} type="text" name='username' className="input-login usename" required/>
            
            </div>

            <div className="login-sec-wrapper">
            <span className='form-text-element'>Palavra-passe</span>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name='password' className="input-login password" required/>
            
            </div>

            <button onClick={handleSubmit} className='btn-login'>Fazer Login</button>
            {isShowingWarn && <WarnUser setIsShowing={setIsShowingWarn} message={warnMsg}/>}

            <p className="recuperar-conta">Clique aqui para contactar <br/>o <a href="#">administrador</a></p>
        </form>
    </div>
  )
}

export default Login