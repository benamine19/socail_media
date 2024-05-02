import React from 'react'
import { useSelector } from 'react-redux'

function LeftSideSar() {
  const state=useSelector(state => state.user_login)
console.log('state', state)
  return (
    <div className='rounded bg-white w-1/4 m-3'>{state.email?state.email : 'zabi'}</div>
  )
}

export default LeftSideSar