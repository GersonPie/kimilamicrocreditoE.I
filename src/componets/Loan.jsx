import React, { useEffect, useState } from 'react'
import { IndividualPayment } from './IndividualPayments'
import { YesNoPrompt } from './YesNoPrompt'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'



const Loan = ({loan, selectedLoan, setSelectedLoan, payments}) => {
const [loanDropDown, setLoanDropDown] = useState()
const [totalPaid, setTotalPaid] = useState(0)
const [showYes, setShowYes] = useState(false)
const [newLoanValue, setNewLoanValue] = useState(false)


  const handleAddPayment = async () =>{

    await addDoc(collection(db, "payments"), {
      amount: newLoanValue,
      date: Timestamp.fromDate(new Date()),
      id: `payment${new Date().getTime()}`,
      loanId: loan.id

   }) 
  }


  useEffect(()=>{
    var total_paid_sum = 0;
    if(selectedLoan === loan.id){
      
      const list = payments.map(payment => {
        if(payment.loanId === loan.id){
          total_paid_sum += Number(payment.amount)
          return <IndividualPayment key={payment.id} date={payment.date} amount={payment.amount} />
        }
      })
      setLoanDropDown(list)
    }
    setTotalPaid(total_paid_sum)
  }, [selectedLoan, loan, payments])




  return (
    <div className={loan.active ? "active-loan loan" : "loan"} >
        <div className='loan-header'>
            <p onClick={()=>{setSelectedLoan(loan.id !== selectedLoan ? loan.id : "")}}>{loan.id}</p>
            <p>{loan.amount}MZN</p>
        </div>
        { selectedLoan === loan.id &&
          <div className="payments-dispay">
            
          {loanDropDown}

          <div className='payments-bottom-side-wrapper'>
            <div className='➕div' onClick={()=>setShowYes(true)}>
            <svg className='➕' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>
            <div className="totals">
              <div className='separator'>
              <h4>Total Pago</h4>
              <span>{totalPaid}MZN</span>
              </div>

              <div className='separator'>
                <h4>Por Pagar</h4>
                <span>{loan.amount - totalPaid}MZN</span>
              </div>
            </div>
          </div>

          
        </div>}
         {showYes && <YesNoPrompt msg={"Coloque o valor do pagamento"} action={handleAddPayment} value={newLoanValue} setShowYes={setShowYes} setValue={setNewLoanValue} max={Number(loan.amount - totalPaid)} min={100}/>}   
    </div>
  )
}



export default Loan