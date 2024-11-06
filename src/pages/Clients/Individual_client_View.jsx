import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../../App'
import { fakedata } from '../../assets/fakedata';
import { assets } from '../../assets/assets';

export const Individual_client_View = (props) => {
  const [__ACTIVE_USER, setACTIVE_USER] = useState(null)
  const [hasLoadedData, setHasLoadedData] = useState(false)
  const [totalPaid, setTotalPaid] = useState(0)
  const [activeLoan, setActiveLoan] = useState("")
  const [payments_display, set_payments_display] = useState(null)
  const {activeClientOBJ} = useContext(AppContext);
  const {data} = useContext(AppContext);

  const {users, loans, payments} = data;

  const load_payments=()=>{
    if(__ACTIVE_USER != null){
      let payments_proto = [];
      let totalPaid_proto = 0;
      
      
        payments.map((e, index) =>{
          loans.map(loan=>{
            if(loan.userId === __ACTIVE_USER.id && loan.id === e.loanId){
              let a = <div key={index} className='individualpayments'>
              <p>{e.date}</p>
              <div className="individualpayments-wrapper">
              <p>{e.ammount}.00MZN</p>
              <img src={assets.trash} className='icon' alt="apagar pagamento" />
              </div>
              
            </div>
            totalPaid_proto += e.ammount
            payments_proto.push(a)
            }
          })
          
        })
        
      
      setTotalPaid(totalPaid_proto)
      set_payments_display(payments_proto)
      
    return true;
      
    }
    else return false
  }
  useEffect(()=>{
    users.map((user)=>{
      if(user.id == activeClientOBJ.activeClientID){
        setACTIVE_USER(user);
      }
    })
    
    
  }, [])
  useEffect(()=>{
    setHasLoadedData(load_payments());
    console.log(__ACTIVE_USER)
  }, [__ACTIVE_USER])
  return (
    <>
    {hasLoadedData &&
    <div className='main-container'>
        <h2>Cliente</h2> 

        <div className="user-profile">
          <div className="profile-wrapper">
            <img src={__ACTIVE_USER.avatar} alt={`perfil do ${__ACTIVE_USER.name}`} />
            <p>{__ACTIVE_USER.name}</p>
            <div className="state-dot"></div>
              <div className="profile-details">
                <div className="profile-details-wrapper">
                  <img className='icon' src={assets.wallet} alt="" />
                  <span>{
                    //__ACTIVE_USER.loans[0].ammount
                }.00MZN</span>
                </div>


                <div className="profile-details-wrapper">
                  <img className='icon' src={assets.dollar} alt="" />
                  <span>{
                   // __ACTIVE_USER.loans[0].ammount * 0.3
                }.00MZN</span>
                </div>
            </div>
          </div>
          
        </div>


        <div className="loan-details">
          <div className="header-loan-details">
            <h3 className="data">Data</h3>
            <h3 className="pago">Pago</h3>
          </div>

          <div className="payments">
              {payments_display}


              <div className="totalpaidwrapper">

                <h3>Total Pago</h3>
                <p>{totalPaid}.00MZN</p>
                <br />
                <h3>Saldo Actual</h3>
                <p>{
                //__ACTIVE_USER.loans[0].ammount-totalPaid
                }.00</p>
              </div>
          </div>
        </div>

      
    </div>}
    </>
  )
}
