import React from "react"
import { assets } from "../assets/assets"

export const IndividualPayment =({date, amount})=>{
    
    return (
      <div className="individualpayment">
        <p>{date.toDate().toLocaleDateString()}</p>
        <div><p>{amount}mzn</p><img className="icon" src={assets.trash}/></div>
      </div>
    )
  }