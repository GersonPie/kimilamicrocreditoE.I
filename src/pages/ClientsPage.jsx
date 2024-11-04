import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ClientsEach } from '../componets/ClientsEach'
import { fakedata } from '../assets/fakedata'
import { SearchBar } from '../componets/SearchBar'

export const ClientsPage = () => {
  const [listOfUsers, setListOfUsers] = useState(null)


  
  useEffect(()=>{
    let __USER_PROTO = [];
    fakedata.map(user =>{
      user.loans.map(loan =>{
        __USER_PROTO.push(<ClientsEach key={user.id} id={user.id} loanAmmount={loan.ammount} name={user.name} avatar={user.avatar}/>)
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

