import React, {useContext} from 'react'
import { auth } from '../config/firebase'
import { AppContext } from '../App'
export const Settings_Page = () => {
  const {go_to_page} = useContext(AppContext)



  const handleLogOut = ()=>{
    auth.signOut();
    localStorage.clear();
    sessionStorage.clear();

    go_to_page("login");
  }
  
  
  
  return (
    <div className='main-container'>
        <h2>Cofigurações</h2>
        <br />
        <h3>Conta</h3>
        
        <div className='clients-each'>
          <img className='avatar' src={auth?.currentUser?.photoURL} alt="" />
          <div className='client-details'>
            <h4>{auth?.currentUser?.displayName}</h4>
            <p>{auth?.currentUser?.email.slice(0,18)} ...</p>
          </div>
          <div onClick={handleLogOut} className="btn red">
            log out
          </div>
        </div>

        <br />
        
    </div>
  )
}
