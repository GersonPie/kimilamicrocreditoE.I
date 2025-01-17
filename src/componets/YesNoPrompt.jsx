import React, { useState, useContext, useEffect } from 'react';
import {AppContext} from '../App';



export const YesNoPrompt = ({msg,min, max, action,value, setShowYes,setValue}) => {
  const {data} = useContext(AppContext);
  const {_BAG_FULLA_SHIT, setBag} = data;
  const [appFee, setFee] = useState(0)
  const [warning, setWarning] = useState("")

  useEffect(()=>{
    _BAG_FULLA_SHIT.map(shit =>{
      if(shit.fee){
        setFee(shit.fee)
      }
    })

  }, [_BAG_FULLA_SHIT])

  const warnUser = (warn_msg)=>{
    setWarning(warn_msg);
    const timerID = setTimeout(()=>{
      setWarning('');
      clearTimeout(timerID);
    }, 8000)
    
  }
  const handleCreateLoan=()=>{
      if(value < min)
        warnUser(`O valor minimo de pagamento é ${min}MZN`)
      
      else if(value > max)
        warnUser(`O valor maximo possivel é ${max}MZN`)
      else if(max - value < min && max - value !== 0)
        warnUser(`Ao pagar ${value}MZN remanescente será ${max-value}MZN, o que é menor que o minimo de pagamento. Pague ${max}MZN`)
      else{
        action();
        setShowYes(false)
        setValue(0)
      }

    }
  

  return (
    <form className='yesnoprompt' onSubmit={(e)=>e.preventDefault()} onKeyDown={(e)=> e.key === "Esc" && setShowYes(false)}>
        <h3>{msg}</h3>
        <p>{warning}</p>
        
        <div>
          <input value={value} type="number" onChange={(e)=>setValue(e.target.value)} autoFocus/>
          <br /><span style={{color:'tomato'}}>Info: {'->'} taxa de juros actual: {appFee*100}%</span>
        </div>
        <div className='btns'>
          <input value='Sim' type='submit' onClick={handleCreateLoan} className="btn"/>
            
          <div onClick={()=>{setShowYes(false)}} className="btn red">
            Não
          </div>
        </div>
    </form>
  )
}
