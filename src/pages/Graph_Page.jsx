import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from '../App'
export const Graph_Page = () => {
  const {data} = useContext(AppContext)
  const [V_em_circulação, setv_em_circulação] = useState(0)
  const {users,loans,payments} = data;
  
  useEffect(()=>{
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
            <p>{30}%</p>

          </div>
        </div>
    </div>
  )
}

