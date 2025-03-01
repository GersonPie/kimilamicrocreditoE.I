import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ClientsEach } from '../componets/ClientsEach'
import { SearchBar } from '../componets/SearchBar'
import App, { AppContext } from '../App'



export const ClientsPage = () => {
  const [listOfUsers, setListOfUsers] = useState(null)
  const {data} = useContext(AppContext);
  

  const {loans, searchInput, setSearchInput, searchResults, setResults} = data;
  const users = searchResults;
  
  useEffect(()=>{
    
    let __USER_PROTO = [];
    let activeLoan = {};
    users.map(user =>{
      const user_loans = loans.filter(loan =>{
  
        if(loan.userId == user.id) return true
        
      }
    )
    user_loans.map(loan=>{
      if(loan.active){
        activeLoan = loan;
        __USER_PROTO.push(<ClientsEach firestoreID={user.firestoreID} key={user.id} id={user.id} deadline={loan.deadline} loanAmmount={loan.amount} name={user.name} avatar={assets.avatar}/>)
      }
    })
    
    if(!user_loans.length || activeLoan.id == undefined){
      __USER_PROTO.push(<ClientsEach firestoreID={user.firestoreID} key={user.id} id={user.id} loanAmmount={0} name={user.name} avatar={assets.avatar}/>)
    }
      
      
    })
    setListOfUsers(__USER_PROTO);
  },[users])

  useEffect(()=>{
    setResults(data.users);
  }, [])
  return (
    <div className="main-container clients">

      <SearchBar/>
      <div className="clients-top">
        <h2>Clientes</h2>
        <img src={assets.az}/>
      </div>

      <div className="clients-body">

        {listOfUsers}

        <div className='users-gap'></div>
      </div>
    </div>
  )
}

