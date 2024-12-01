import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { db, collection } from '../config/firebase'
import { addDoc, Timestamp} from 'firebase/firestore'
import { WarnUser } from '../componets/warnUser'


export const Add_Clients = (props) => {
  const {active_add_clients} = useContext(AppContext)
  const [newUser, setNewUser ] = useState("")
  const [isShowing, setIsShowing ] = useState(false)

  const handleInputChange = (event) =>{
    setNewUser(event.target.value)
  }

  const handleSubmit = async () => {
    if(newUser.length >=3){
      await addDoc(collection(db, "users"),{
        name:newUser ,
        id: new Date().getTime(),
        type: "user",
        date: Timestamp.fromDate(new Date())
      }).then(()=>{
        setNewUser("")
        setIsShowing(false)
      }).catch(err =>{
        console.error("error fetching data after addClient ",err)
      })
    }
    else {
      setIsShowing(true)
    }
    

  }



  return (
    <div className={`main-container addclients ${props.animation}`}>
      <div className="addclient-top">
        <p><b>Adicionar Benificiario</b></p>
        <svg className='addclient-x' onClick={()=>active_add_clients()} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </div>


      <form onSubmit={(e)=>e.preventDefault()} className="addclient-field">
        <input autoFocus value={newUser} onChange={event => handleInputChange(event)} className='addclient-input' type="text" />
        <svg onClick={handleSubmit} className='addclient-submit' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
      </form>
      {isShowing && <WarnUser message={"Novo Usuario inválido, insira um nome com mais de 3 digitos"} setIsShowing={setIsShowing}/> }
    </div>
  )
}

