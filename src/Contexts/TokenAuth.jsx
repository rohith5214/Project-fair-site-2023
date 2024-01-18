import React, { createContext, useState } from 'react'
export const authorizationContext = createContext()
function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized] = useState(false)
  return (
    <>
      <authorizationContext.Provider value={{isAuthorized,setIsAuthorized}}>
       {children}
      </authorizationContext.Provider>
    </>
  )
}

export default TokenAuth