import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../App'
import { deleteDoc } from 'firebase/firestore'



export const ClientsEach = (props) => {
    const { go_to_page, activeClientOBJ } = useContext(AppContext)
    const [deleteUser, setDeleteUser] = useState(false)

    const handleClick = ()=>{

        if(deleteUser){
            const answer = prompt("escreva o nome do benificiente para confirmar que deseja apagar")
            if(props.name === answer){
                delete_user(props.id);
            }
            setDeleteUser(false)
        }
        else{
            activeClientOBJ.setActiveClientID(props.id)
            go_to_page('individual-client');
        }
    }

    function delete_user(id){
        // deleteDoc
    }
    function getRandomHexColor() {
        // Generate a random number between 0 and 16777215 (0xFFFFFF)
        const randomNum = Math.floor(Math.random() * 16777215);
      
        // Convert the number to a hexadecimal string and pad it to 6 characters
        const hexColor = `#${randomNum.toString(16).padStart(6, "0")}`;
      
        return hexColor;
      }

    useEffect(()=>{
        if(deleteUser)handleClick()
    }, [deleteUser])
  return (
    
    <div className="clients-each" >
        <div onClick={handleClick} className='custom-avatar' style={{backgroundColor: getRandomHexColor()}}><h3>{props.name.slice(0,2)}</h3></div>
        <div className="client-wrapper">

        <div className="client-details" onClick={handleClick}>
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
        <div className="remove-user" onClick={()=> {setDeleteUser(true);}}>
            <img className='icon ' src={assets.trash} alt=""/>
        </div>
        </div>
    </div>
    
  )
}

