import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../App'
import { YesNoPrompt } from '../../componets/YesNoPrompt'
import Loan from '../../componets/Loan'
import { db } from '../../config/firebase'
import { Timestamp, addDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore'
import { WarnUser } from '../../componets/warnUser'


export const Individual_client_View = () => {

  const { activeClientOBJ, data } = useContext(AppContext)
  const { users, loans, payments } = data;
  const [ activeUser, setActiveUser] = useState({})
  const [ userLoans, setUserLoans] = useState([])
  const [ activeLoan, setActiveLoan] = useState()
  const [ selectedLoan, setSelectedLoan] = useState("")
  const [ showYes, setShowYes] = useState(false)
  const [newLoanAmount, setNewLoanAmount] = useState(0)
  const [isShowing, setIsShowing] = useState(false)
  

  async function updateLoanStatus(customLoanId) {
    try {
      const q = query(collection(db, "loans"), where("id", "==", customLoanId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          active: false
        });
      });
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  }


  async function  createNewLoan (){
    if(activeLoan !== undefined)return setIsShowing(true);
    function getFollowingMonthFirstDay() {
      const currentMonth = new Date().getMonth();
      const nextMonth = (currentMonth + 1) % 12;
      const nextYear = currentMonth === 11 ? new Date().getFullYear() + 1 : new Date().getFullYear();
    
      return new Date(nextYear, nextMonth, new Date().getDate());
    }

    updateLoanStatus(activeLoan?.id || 0)
    await addDoc(collection(db, "loans"), {
      active: true,
      amount: newLoanAmount,
      date: Timestamp.fromDate(new Date()),
      deadline: getFollowingMonthFirstDay(),
      id: new Date().getTime(),
      userId: activeUser.id

   }) 
  }

  useEffect(()=>{
    setActiveLoan(undefined)
    userLoans.map(loan =>{
      if(loan.active === true){
        setActiveLoan(loan)
      }
    })
  }, [userLoans, loans])


  useEffect(()=>{
    
    users.map((user)=>{
      if(user.id === activeClientOBJ.activeClientID){
        setActiveUser(user);
        setUserLoans(loans.filter(loan =>loan.userId === user.id))
        
      }
    })

  }, [loans])
  return (
    <>
    
    <div  className='main-container'>
      <div className="profile-wrapper">
        <img src={assets.avatar} alt="" />

        <div className="profile-details">
          <h3>{activeUser.name}</h3>
          <div className="profile-details-wrapper">
          <img src={assets.wallet} className='icon'  alt="" />
          <span>{activeLoan?.amount || 0}MZN</span>
          <img src={assets.dollar} className='icon'  alt="" />
          <span>{(activeLoan?.amount || 0) * 0.3}MZN</span>
          </div>
        </div>
      </div>
      
      <div className="loan-list">
        <div className="loans-list-header">
        <h3>ID</h3>
        <h3>Valor</h3>
        </div>

        <div className="loans-wrapper">
        {
        userLoans.length === 0 ? <p style={{color: 'gray', textAlign: 'center'}}>{activeUser.name} Não tem nenhum credito</p>:
        userLoans.map(loan=>{
          
          return <Loan key={loan.id} loan={loan} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} payments={payments} />
        })
        
        }
        </div>
        
        
        
      </div>

      <div onClick={()=>{
        loans.map(l =>{
          if(l.active){
            setShowYes(false)
          }
          else{
            setShowYes(true)
          }
        })
        setShowYes(true)
        }} className="newLoanBTN">
        Adicionar Emprestimo
      </div>
      {showYes && <YesNoPrompt min={500} max={25000} value={newLoanAmount} msg={`Deseja criar novo emprestimo para \n ${activeUser.name}`} setShowYes={setShowYes} action={createNewLoan} setValue={setNewLoanAmount} />}
    </div>
    {isShowing &&<WarnUser message={"Pague o emprestimo actual antes de iniciar outro"} setIsShowing={setIsShowing} time={12000}/>}
    </>
  )
}


