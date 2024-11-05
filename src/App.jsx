import { createContext, useContext, useEffect, useState } from "react"
import Home_Page from "./pages/Home_Page";
import { StartPage } from "./pages/Start_page";
import { Topbar } from "./componets/Topbar";
import { NavBar } from "./componets/NavBar";
import { ClientsPage } from "./pages/ClientsPage";
import { Add_Clients } from "./pages/Add_Clients";
import { Graph_Page } from "./pages/Graph_Page";
import { Settings_Page } from "./pages/Settings_Page";
import { Individual_client_View } from "./pages/Clients/Individual_client_View";
import { db, collection, getDocs } from './config/firebase';

export const AppContext = createContext();

function App() {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const [animation, setAnimation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [is_add_clients_tab_active, activeClientsTab] = useState(false);
  const [addClientsAnimation, setAddClientsAnimation] = useState("");
  const [activeClientID, setActiveClientID] = useState("");
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [payments, setPayments] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch all collections in parallel
          const [usersSnapshot, loansSnapshot, paymentsSnapshot] = await Promise.all([
            getDocs(collection(db, "users")),
            getDocs(collection(db, "loans")),
            getDocs(collection(db, "payments")),
          ]);
  
          // Map and set the data for each collection
          setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setLoans(loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setPayments(paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData();
  }, []);

  const active_add_clients=()=>{
    if(addClientsAnimation.length)return;
      else{
    
    if(is_add_clients_tab_active){
      setAddClientsAnimation("slideout")
      setTimeout(()=>activeClientsTab(false), 300);
    }
    else{
      setAddClientsAnimation("slidein")
      activeClientsTab(true);
    }
  }
    setTimeout(()=>setAddClientsAnimation(''), 400);
  }

  const go_to_page =(pagename)=>{
    let newCurrentPage = <StartPage/>;
    
    if(pagename == "boot")newCurrentPage =<StartPage/>
    else if(pagename == "home") newCurrentPage = <><Topbar/><Home_Page/><NavBar/></>
    else if(pagename == "clients") newCurrentPage = <><Topbar/><ClientsPage/><NavBar/></>
    else if(pagename == "graph") newCurrentPage = <><Topbar/><Graph_Page/><NavBar/></>
    else if(pagename == "settings") newCurrentPage = <><Topbar/><Settings_Page/><NavBar/></>
    else if(pagename == "individual-client") newCurrentPage = <><Topbar/><Individual_client_View clientID={activeClientID}/><NavBar/></>
    else newCurrentPage = <StartPage />


      setAnimation("fadeaway")
      setIsLoading(true)

      if(is_add_clients_tab_active){
        active_add_clients()
      }

      setTimeout(()=>{
        setCurrentPage(newCurrentPage)
      },200)
      
      setTimeout(() => {
        setAnimation("start_logo_appear")
        setIsLoading(false)
          
      }
      ,300);
    
  }
  const loader = {
    isLoading,
    setIsLoading
  }
  const data={
    users, 
    loans, 
    payments
  }
  
  const activeClientOBJ = {
    activeClientID,
    setActiveClientID
  }

  return (
    <div className="app">
      
      <AppContext.Provider value={{data,activeClientOBJ,go_to_page, active_add_clients}}>
        {
          is_add_clients_tab_active && <Add_Clients animation={addClientsAnimation}/>
        }

        <div className={isLoading ? "loader" : "hide"}>
          <div className="loading-effect"></div>
        </div>

      <div className={"appwrapper " + animation}>
        
      
      {currentPage}

        
      </div>
      </AppContext.Provider>
      
    </div>
  )
}


export default App
