import React, {useContext, useEffect, useState} from 'react'
import { auth } from '../config/firebase'
import { AppContext } from '../App'
export const Settings_Page = () => {
  const {go_to_page,data} = useContext(AppContext)
  const [V_em_circulação, setv_em_circulação] = useState(0)
  const {users,loans,payments} = data;



  const handleLogOut = ()=>{
    auth.signOut();
    localStorage.clear();
    sessionStorage.clear();

    go_to_page("login");
  }
  
  useEffect(()=>{
    const activeLoans = loans.filter(loan =>loan.active)
    let totalLoans = 0;
    activeLoans.forEach(loan => {
      let totalPayments = 0;
      payments.forEach(pay=>{
        if(pay.loanId === loan.id)
        totalPayments += Number(pay.amount)
      })
      totalLoans += Number(loan.amount - totalPayments)
      
    });
    setv_em_circulação(totalLoans)
  }, [])
  
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
        <div className="geral">
          <h3>Cliente</h3>
          <div className="clients-separador">

          <p>total Clientes</p>
            <p>{users.length}</p>

          </div>

          <div className="clients-separador">

          <p>Valor em Circulação</p>
            <p>{V_em_circulação}MZN</p>

          </div>
          <div className="clients-separador">

          <p>Juros</p>
            <p>{30}%</p>

          </div>
        </div>
    </div>
  )
}
