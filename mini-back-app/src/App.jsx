import { useEffect, useState } from "react"
import { StartPage } from "./pages/start_page"
import usePage  from "./hooks/usePage"
function App() {

  const {currentPage, useCurrentPage} = usePage()
  
  return (
    <div className="app">

      <StartPage />
      
    </div>
  )
}


export default App
