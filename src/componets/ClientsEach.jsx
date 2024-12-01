import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../App'
import { db } from '../config/firebase'
import { deleteDoc, doc } from 'firebase/firestore'



export const ClientsEach = (props) => {
    const { go_to_page, activeClientOBJ, data } = useContext(AppContext)
    const [deleteUser, setDeleteUser] = useState(false)

    const handleClick = ()=>{

        if(deleteUser){
            const answer = prompt(`escreva ${props.name} para confirmar que deseja apagar`)
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

    const delete_user=(id)=>{
        const loans_to_delete = data.loans.filter(loan=>{
            
            if(loan.userId === id){

                data.payments.map(pay=>{

                    if(pay.loanId === loan.id)
                        delete_file_on_DB(pay.firestoreID, "payments")
                    })
                    return true
            }
            
        })
        
        loans_to_delete.map(loan=>{
            console.log(`deleting loan id ${loan.firestoreID}`);
            delete_file_on_DB(loan.firestoreID, 'loans')
        })

        data.users.map(user=>{
            if(user.id === id){
                delete_file_on_DB(user.firestoreID, 'users')
            }
        })
    
        async function delete_file_on_DB(file_id,list){
            await deleteDoc(doc(db, list, file_id));
        }

    }

    useEffect(()=>{
        if(deleteUser)handleClick()
    }, [deleteUser])
  return (
    
    <div className="clients-each" >
        <div onClick={handleClick} className='custom-avatar'><h3>{props.name.slice(0,2)}</h3></div>
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

