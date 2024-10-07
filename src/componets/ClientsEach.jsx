import React from 'react'
import { assets } from '../assets/assets'

export const ClientsEach = (props) => {
  return (
    
    <div className="clients-each">
        <img className='avatar' src={props.avatar} alt="username" />
        <div className="client-details">
            <h3>Nelson Marsal</h3>
            <div className="client-details-values">
                <div className="client-details-loan-amount">
                    <img src={assets.wallet} alt="wallet" className='dollar-icon'/>
                    100.00MZN
                </div>
                <div className="separator">|</div>
                <div className="client-details-loan-amount">
                    <img src={assets.dollar} alt="wallet" className='dollar-icon' />
                    30.00MZN
                </div>
                <div className="loan-state-dot"></div>
            </div>
        </div>
    </div>
    
  )
}

