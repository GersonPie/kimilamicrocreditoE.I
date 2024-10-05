import { createContext, useContext, useEffect, useState } from "react"
import Home_Page from "./pages/Home_Page";
import { StartPage } from "./pages/start_page";
import Clients_page from "./pages/Clients_page";
import { Topbar } from "./componets/Topbar";
import { NavBar } from "./componets/NavBar";
export const AppContext = createContext();
function App() {
  const [currentPage, setCurrentPage] = useState(<StartPage />);
  const [animation, setAnimation] = useState("");
  
  const go_to_page =(pagename)=>{
    let newCurrentPage = <StartPage/>;
    if(pagename == "boot")newCurrentPage =<StartPage/>
    else if(pagename == "home") newCurrentPage = <><Topbar/><Home_Page/><NavBar/></>
    else if(pagename == "clients") newCurrentPage = <><Topbar/><Clients_page/><NavBar/></>
    else newCurrentPage = <StartPage />

    setAnimation("fadeaway")
    setTimeout(() => {
        
        setCurrentPage(newCurrentPage)
    }, 200);
    
  }
  
  return (
    <div className={"app " + animation}>
      <AppContext.Provider value={{go_to_page}}>
        
        {currentPage}

      </AppContext.Provider>
      
    </div>
  )
}


export default App
