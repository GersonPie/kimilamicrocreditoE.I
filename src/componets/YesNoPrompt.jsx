import React from 'react'

export const YesNoPrompt = ({msg, setAnswer,newLoanAmount, setShowYes,setNewLoanAmount}) => {


  const handleCreateLoan=()=>{
      if(newLoanAmount>= 500){
        setAnswer();
        setShowYes(false)
      }

    }
  

  return (
    <div className='yesnoprompt'>
        <h3>{msg}</h3>

        <div>
          <input value={newLoanAmount} type="number" onChange={(e)=>setNewLoanAmount(e.target.value)}/>
        </div>
        <div className='btns'>
          <div onClick={handleCreateLoan} className="btn">
            Sim
          </div>
          <div onClick={()=>{setShowYes(false)}} className="btn red">
            Não
          </div>
        </div>
    </div>
  )
}
