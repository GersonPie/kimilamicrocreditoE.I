import React from 'react'
import { assets } from '../assets/assets'
import { ClientsEach } from '../componets/ClientsEach'

const Clients_page = () => {
  return (
    <div className="main-container clients">
      <div className="clients-top">
        <h2>Clientes</h2>
        <img src={assets.az}/>
      </div>

      <div className="clients-body">
      <ClientsEach avatar={assets.avatar} />
      <ClientsEach avatar={assets.avatar} />
      <ClientsEach avatar={assets.avatar} />
      <ClientsEach avatar={assets.avatar} />
      </div>
    </div>
  )
}

export default Clients_page