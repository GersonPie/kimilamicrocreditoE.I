import React, { useEffect, useState } from 'react'

export const WarnUser = ({message, setIsShowing, time}) => {
    const [slideOutAnimation, setSlideOutAnimation]= useState(false)


    useEffect(()=>{
        

        setTimeout(()=>{
            setSlideOutAnimation(true)
            setTimeout(()=>{
                setIsShowing(false)
            }, 1000)
        }, time || 3000)

        //return clearInterval(desapearTimer)
    }, [])

    
    
    
    useEffect(()=>{

    }, []);
  return (
    <div className={slideOutAnimation ? "warn-user slide-msg-out": "warn-user slide-msg-in"}><div>

        {message}
    </div>
    </div>
  )
}
