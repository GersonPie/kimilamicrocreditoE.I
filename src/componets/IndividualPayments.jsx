import React from "react"
import { assets } from "../assets/assets"

export const IndividualPayment =({date, amount})=>{
    
    return (
      <div className="individualpayment">
        <p>{date}</p>
        <div><p>{amount}mzn</p><img className="icon" src={assets.trash} alt="" /></div>
      </div>
    )
  }