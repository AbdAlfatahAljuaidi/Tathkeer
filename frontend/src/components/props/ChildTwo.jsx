import React, { useContext } from 'react'
import Abood from './Context'

const ChildTwo = () => {

  const n = useContext(Abood)
  return (
    <div>
        <h1>{n.age}</h1>
    </div>
  )
}

export default ChildTwo