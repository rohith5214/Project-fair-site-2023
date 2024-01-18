import React, { createContext, useState } from 'react'
export const editProjectResponseContext = createContext()
function EditContextshare({children}) {
    const [editProjectResponse,setEditProjectResponse] = useState({})
  return (
    <>
    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      {children}
    </editProjectResponseContext.Provider>
    </>
  )
}

export default EditContextshare