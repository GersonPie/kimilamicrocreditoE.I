import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../App';
export const SearchBar = () => {
  const {data} = useContext(AppContext)
  const { users,searchInput, setSearchInput, searchResults, setResults} = data;
  
  useEffect(()=>{
    if(searchInput.trim().length >= 0){
      const search_results_proto = users.filter(user =>{
        if(user.name.match(new RegExp(searchInput, 'i'))){
          
          return user;
        }
        else{
          setResults(users)
        }
      })
      
      setResults(search_results_proto);
    }
    

  }, [searchInput, users])

  useEffect(()=>{
    searchResults.map((result)=>{
      console.log(result.name);
    })
  }, [searchResults])
  return (
    <div className="search-bar-div">
        <input type="search" onChange={(e)=>setSearchInput(e.target.value)} value={searchInput} name="search" id="search-bar-input" />
        <img src={assets.search} id="search-bar-icon" alt="" />
      </div>
  )
}
