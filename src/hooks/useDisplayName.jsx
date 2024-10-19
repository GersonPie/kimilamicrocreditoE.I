import React from 'react'

export const useDisplayName = (fullname, chars) => {
  
    console.log(fullname.slice(1,chars))
    return fullname.slice(1,chars);
}
