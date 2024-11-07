import React from 'react'
import { IndividualPayment } from './IndividualPayments'
const Loan = ({loan, selectedLoan, setSelectedLoan, payments}) => {
  return (
    <div className='loan' onClick={()=>{setSelectedLoan(loan.id)}}>
        <div className='loan-header'>
            <h4>{loan.id}</h4>
            <h4>{loan.amount}MZN</h4>
        </div>
        <div className="payments-dispay">
        {
        loan.id === selectedLoan ? 
        payments.map(payment =>{
            if(payment.loanId === loan.id)return <IndividualPayment key={payment.id} date={payment.date.toDate().toLocaleDateString()} amount={payment.amount}/>
        }) : ""

        }
        
        </div>
            
    </div>
  )
}

export default Loan