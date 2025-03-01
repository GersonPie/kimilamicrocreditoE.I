import React, {useContext, useEffect, useState } from 'react'
import { IndividualPayment } from './IndividualPayments'
import { YesNoPrompt } from './YesNoPrompt'
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AppContext } from '../App'


const Loan = ({loan, selectedLoan, setSelectedLoan, payments}) => {
const [loanDropDown, setLoanDropDown] = useState()
const [totalPaid, setTotalPaid] = useState(0)
const [showYes, setShowYes] = useState(false)
const [newLoanValue, setNewLoanValue] = useState(false)
const [ AppFee, setAppFee] = useState(0)
const {data } = useContext(AppContext)
const {_BAG_FULLA_SHIT, setBag} = data;

  useEffect(()=>{
    _BAG_FULLA_SHIT.map((shit)=>{
        if(shit.fee !== undefined){
            setAppFee(shit.fee)
          }
    })
  }, [_BAG_FULLA_SHIT])


  const handleAddPayment = async () =>{

    await addDoc(collection(db, "payments"), {
      amount: Number(newLoanValue),
      date: Timestamp.fromDate(new Date()),
      id: new Date().getTime(),
      loanId: loan.id
      
   })
  }

  
  useEffect(()=>{
    const updateActive = async ()=>{
      if((Number(loan.amount) + Number(loan.amount)*AppFee) - totalPaid == 0){
        console.log(loan.firestoreID)
        await updateDoc(doc(db,"loans", loan.firestoreID), {active: false})
       }
    }
    updateActive()
  }, [totalPaid])
  useEffect(()=>{
    var total_paid_sum = 0;
    if(selectedLoan === loan.id){
      
      const list = payments.map(payment => {
        if(payment.loanId === loan.id){
          total_paid_sum += Number(payment.amount)
          return <IndividualPayment isLoanActive={loan.active} firestoreID={payment.firestoreID} key={payment.id} date={payment.date} amount={payment.amount} />
        }
      })
      setLoanDropDown(list)
    }
    setTotalPaid(total_paid_sum)

  }, [selectedLoan, loan, payments])




  return (
    <div className={loan.active ? "active-loan loan" : "loan"} >
        <div className='loan-header'>
            <p onClick={()=>{setSelectedLoan(loan.id !== selectedLoan ? loan.id : "")}}><svg className={selectedLoan === loan.id ? "rotate-down" : ''} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></p>
            <p>{loan.amount}MZN</p>
        </div>
        { selectedLoan === loan.id &&
          <div className="payments-dispay">
            
          {loanDropDown}

          <div className='payments-bottom-side-wrapper'>
            <div className='➕div' onClick={()=>loan.active && setShowYes(true)}>
            <svg className='➕' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </div>
            <div className="npm">
              <div className='separator'>
              <h4>Total Pago</h4>
              <span>{totalPaid}MZN</span>
              </div>

              <div className='separator'>
                <h4>Por Pagar até <br />{loan.deadline.toDate().toLocaleDateString()}</h4>
                <span>{(Number(loan.amount) + Number(loan.amount)*AppFee) - totalPaid}MZN</span>
              </div>
            </div>
          </div>

          
        </div>}
         {showYes && <YesNoPrompt msg={"Coloque o valor do pagamento"} action={handleAddPayment} value={newLoanValue} setShowYes={setShowYes} setValue={setNewLoanValue} max={(Number(loan.amount) + Number(loan.amount)*AppFee) - totalPaid} min={100}/>}   
    </div>
  )
}



export default Loan