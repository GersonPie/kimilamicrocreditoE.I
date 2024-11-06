import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../App'
import { assets } from '../assets/assets'
export const RecentPosts = () => {
    const [recentView, setRecentView] = useState(null)
    const { data } = useContext(AppContext)
    const {users, loans, payments} = data;
    

    useEffect(()=>{
        let proto_recent = users.map(user=>{
            return <IndividualRecentPost id={user.id}  profile={assets.avatar} name={user.name} />
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
