import React, { useEffect, useState, useContext } from 'react'
import { fakedata } from '../assets/fakedata'
import { AppContext } from '../App'
export const RecentPosts = () => {
    const [recentView, setRecentView] = useState(null)
   

    

    useEffect(()=>{
        let proto_recent = fakedata.map(data=>{
            return <IndividualRecentPost id={data.id}  profile={data.avatar} name={data.name} />
        })
        setRecentView(proto_recent)
        console.log(proto_recent)
    }, [])
  return (
    <div className="recentposts">

        <h2>Recentes</h2>
        
        <div className="recent-people">
            
            {recentView}
        </div>
    </div>
  )
}

const IndividualRecentPost=(props)=>{
    const { go_to_page, activeClientOBJ } = useContext(AppContext)
    const handleClick = ()=>{
        activeClientOBJ.setActiveClientID(props.id)
        go_to_page('individual-client');
    }
    
    return (
        <div className="recent-person" onClick={handleClick}>
                <div className="profile">
                    <img src={props.profile} alt="profile picture" />
                </div>
                <p>{props.name}</p>
            </div>
    )
}
