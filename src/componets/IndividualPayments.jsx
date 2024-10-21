import React from "react"

export const IndividualPayment =(date, ammount)=>{
    
    return (
      <div className="individualpayment">
        <p>{date}</p>
        <p>{ammount}</p>
      </div>
    )
  }