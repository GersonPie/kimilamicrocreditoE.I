import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../../App'
import { fakedata } from '../../assets/fakedata';
import { assets } from '../../assets/assets';

export const Individual_client_View = (props) => {
  const [__ACTIVE_USER, setACTIVE_USER] = useState({})
  const {activeClientOBJ} = useContext(AppContext);

  useEffect(()=>{
    fakedata.filter((user)=>{
      if(user.id == activeClientOBJ.activeClientID){
        setACTIVE_USER(user);
      }
    })
    
    
  }, [])
  return (
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
                  <span>2400.00MZN</span>
                </div>


                <div className="profile-details-wrapper">
                  <img className='icon' src={assets.dollar} alt="" />
                  <span>720.00MZN</span>
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
            
          </div>
        </div>
    </div>
  )
}
