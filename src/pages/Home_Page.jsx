import React, { useContext } from 'react'
import App, { AppContext } from '../App'
import {NavBar} from '../componets/NavBar.jsx'
import {Topbar} from '../componets/Topbar'
import { assets } from '../assets/assets.js'
import {RecentPosts} from '../componets/RecentPosts.jsx'
const Home_Page = () => {

    const {go_to_page} = useContext(AppContext)

  return (
    <div className="main-container homepage">
        <h2>Inicio</h2>

        <div className="home-main-image-wrapper">
          <div className="image-info">
            <img src={assets.icon_meter} alt="" />
            <div className="image-info-text">
              <p>Em Circulação</p>
              <h2>6.481,90MZN</h2>
            </div>
          </div>
          <div className="image-info-center-button">
              <p>GRÁFICO</p><img src={assets.icon_graph2} alt="" />
            </div>
          <img className='home-main-image' src={assets.money_img} alt="" />
          
        </div>

      <br />
        <RecentPosts/>
    </div>
  )
}

export default Home_Page