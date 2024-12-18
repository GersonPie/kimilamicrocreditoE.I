import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from '../App'
import {doc, Timestamp, updateDoc} from 'firebase/firestore'
import { db, collection, auth } from '../config/firebase'
export const Graph_Page = () => {
  const {data} = useContext(AppContext)
  const [V_em_circulação, setv_em_circulação] = useState(0)
  const [AppFee, setAppFee] = useState(0)
  const {users,loans,payments, _BAG_FULLA_SHIT} = data;
  
  useEffect(()=>{
    console.log(_BAG_FULLA_SHIT)
    _BAG_FULLA_SHIT.map((bag)=>{
      if(bag.fee !== undefined){
        setAppFee(bag.fee)
      }
    }, [_BAG_FULLA_SHIT])

    const activeLoans = loans.filter(loan =>loan.active)
    let totalLoans = 0;
    activeLoans.forEach(loan => {
      let totalPayments = 0;
      payments.forEach(pay=>{
        if(pay.loanId === loan.id)
        totalPayments += Number(pay.amount)
      })
      totalLoans += Number(loan.amount - totalPayments)
      
    });
    setv_em_circulação(totalLoans)
  }, [])

  const handleFeeButton = async()=>{
    console.log(auth?.currentUser?.displayName)
    if(auth?.currentUser?.displayName !== undefined){
      await updateDoc(doc(db,"Config",'app_configs'),{
        LastAdm: auth?.currentUser?.displayName,
        date: Timestamp.fromDate(new Date()),
        fee: Number(AppFee)
      }).then(()=>{
        alert(`${auth?.currentUser?.displayName} alterou a taxa para ${AppFee}`)
      })

    }
    else{
      alert("Admin invalido")
    }
  }


  return (
    <div className='main-container'>
        <h2>Estatistica</h2>

        <div className="geral">
          <h3>Cliente</h3>
          <div className="clients-separador">

          <p>total Clientes</p>
            <p>{users.length}</p>

          </div>

          <div className="clients-separador">

          <p>Valor em Circulação</p>
            <p>{V_em_circulação}MZN</p>

          </div>
          <div className="clients-separador">

          <p>Juros</p>
          <div>
            <input type="number" min={0} max={50} onChange={(e)=>setAppFee(e.target.value)} value={AppFee} />
            <button onClick={handleFeeButton}>OK</button>
          </div>

          </div>
        </div>
    </div>
  )
}

