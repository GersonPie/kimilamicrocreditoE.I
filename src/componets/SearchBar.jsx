import React from 'react'
import { assets } from '../assets/assets'

export const SearchBar = () => {
  return (
    <div className="search-bar-div">
        <input type="search" name="search" id="search-bar-input" />
        <img src={assets.search} id="search-bar-icon" alt="" />
      </div>
  )
}
