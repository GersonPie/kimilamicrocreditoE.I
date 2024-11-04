import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../App'



export const ClientsEach = (props) => {
    const { go_to_page, activeClientOBJ } = useContext(AppContext)

    const handleClick = ()=>{
        activeClientOBJ.setActiveClientID(props.id)
        go_to_page('individual-client');
    }

  return (
    
    <div className="clients-each" onClick={
        handleClick
    }>
        <img className='avatar' src={props.avatar} alt="username" />
        <div className="client-details">
            <h3>{props.name}</h3>
            <div className="client-details-values">
                <div className="client-details-loan-amount">
                    <img src={assets.wallet} alt="wallet" className='dollar-icon'/>
                    {props.loanAmmount}.00MZN
                </div>
                <div className="separator">|</div>
                <div className="client-details-loan-amount">
                    <img src={assets.dollar} alt="wallet" className='dollar-icon' />
                    {props.loanAmmount * 0.3}MZN
                </div>
                <div className="loan-state-dot"></div>
            </div>
        </div>
    </div>
    
  )
}

