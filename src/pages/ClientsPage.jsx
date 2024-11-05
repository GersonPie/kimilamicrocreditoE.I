import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ClientsEach } from '../componets/ClientsEach'
import { fakedata } from '../assets/fakedata'
import { SearchBar } from '../componets/SearchBar'
import App, { AppContext } from '../App'
export const ClientsPage = () => {
  const [listOfUsers, setListOfUsers] = useState(null)
  const {data} = useContext(AppContext);

  const {users, loans, payments} = data;


  
  useEffect(()=>{
    console.log(users,loans)
    let __USER_PROTO = [];
    users.map(user =>{
      loans.map(loan =>{
        
        if(loan.userId === user.id)
        __USER_PROTO.push(<ClientsEach key={user.id} id={user.id} loanAmmount={loan.amount} name={user.name} avatar={assets.avatar}/>)
      })
      
      
    })
    setListOfUsers(__USER_PROTO);
  },[])
  return (
    <div className="main-container clients">

      <SearchBar/>
      <div className="clients-top">
        <h2>Clientes</h2>
        <img src={assets.az}/>
      </div>

      <div className="clients-body">
        {listOfUsers}
      </div>
    </div>
  )
}

