import React from "react"
import { assets } from "../assets/assets"
import { db } from "../config/firebase"
import { deleteDoc,doc } from "firebase/firestore"

export const IndividualPayment =({date, amount, firestoreID})=>{
    const handleDeletePayment = async ()=>{
      try{
        await deleteDoc(doc(db, "payments", firestoreID));
      }
      catch(err){
        console.error(err)
      }
    }
    return (
      <div className="individualpayment">
        <p>{date.toDate().toLocaleDateString()}</p>
        <div><p>{amount}mzn</p><img onClick={handleDeletePayment} className="icon" src={assets.trash}/></div>
      </div>
    )
  }