import { createContext, useContext, useEffect, useState } from "react"
import Home_Page from "./pages/Home_Page";
import { StartPage } from "./pages/start_page";
import Clients_page from "./pages/Clients_page";
import { Topbar } from "./componets/Topbar";
import { NavBar } from "./componets/NavBar";
import { Add_Clients } from "./pages/Add_Clients";
export const AppContext = createContext();
function App() {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const [animation, setAnimation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const go_to_page =(pagename)=>{
    let newCurrentPage = <StartPage/>;
    
    if(pagename == "boot")newCurrentPage =<StartPage/>
    else if(pagename == "home") newCurrentPage = <><Topbar/><Home_Page/><NavBar/></>
    else if(pagename == "clients") newCurrentPage = <><Topbar/><Clients_page/><NavBar/></>
    else newCurrentPage = <StartPage />


    if(currentPage == newCurrentPage)return;
    else{
    setAnimation("fadeaway")
    setIsLoading(true)
    setTimeout(()=>{
      setCurrentPage(newCurrentPage)
    },200)
    setTimeout(() => {
      setAnimation("start_logo_appear")
      setIsLoading(false)
        
    }
    ,300);
    }
  }
  const loader = {
    isLoading,
    setIsLoading
  }
  
  return (
    <div className="app">
      <AppContext.Provider value={{go_to_page, loader}}>
        {isLoading && <div className="loader">
          <div className="loading-effect"></div>
          </div>}
          
      <div className={"appwrapper " + animation}>
        
          
      {currentPage}

        
      </div>
      </AppContext.Provider>
      
    </div>
  )
}


export default App
