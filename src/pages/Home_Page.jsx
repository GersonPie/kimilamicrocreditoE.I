import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { assets } from '../assets/assets.js'
import {RecentPosts} from '../componets/RecentPosts.jsx'
const Home_Page = () => {
    const [circulação, setv_em_circulação] = useState(0)
    const {data, go_to_page} = useContext(AppContext)
    const {loans, payments} = data;


    useEffect(()=>{
      const activeLoans = loans.filter(loan =>loan.active)
      let totalLoans = 0;
      activeLoans.forEach(loan => {
        let totalPayments = 0;
        payments.forEach(pay=>{
          if(pay.loanId === loan.id)
          totalPayments += Number(pay.amount)
        })
        totalLoans += Number(loan.amount - totalPayments)
        
      });
      setv_em_circulação(totalLoans)
    }, [])
  return (
    <div className="main-container homepage">
        

        <div className="home-main-image-wrapper">
          <div className="image-info">
            <img src={assets.icon_meter} alt="" />
            <div className="image-info-text">
              <p>Capital Em Circulação</p>
              <h2>{circulação}MZN</h2>
            </div>
          </div>
          <div onClick={()=>go_to_page('graph')} className="image-info-center-button">
              <p>GRÁFICO</p><img src={assets.icon_graph2} alt="" />
          </div>
          
        </div>

        <br />

        <RecentPosts/>
    </div>
  )
}

export default Home_Page