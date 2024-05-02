import React from 'react'
import LeftSideSar from '../components/LeftSideSar'
import MainContent from '../components/MainContent'
import RightSideBar from '../components/RightSideBar'



function Structure() {
  return (
    <div className='flex justify-between border-solid border-black border-2 bg-slate-200 '>
        <LeftSideSar/>
        <MainContent />
        <RightSideBar/>
    </div>
  )
}

export default Structure