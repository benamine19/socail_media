import React, { useEffect, useState } from 'react'
import photo from '../images/ai5.jpg'; // Importation de l'image correctement
import Stories from './Stories';
import Posts from './Posts';
import Discussion from './Discussion';
import { useSelector, useDispatch } from 'react-redux';

function MainContent() {
   const [showDisscusion ,setShowDisscusion]=useState(false)
   const etat = useSelector(state => state.boite_disscussion.ouvert);
   useEffect(() => {
    
  }, []);
  return (
  <div className='w-5/12 m-3 rounded bg-slate-50 relative'>
      <Stories/>
      <Posts/> 
   {etat && <Discussion/>}  
  </div>
  )
}

export default MainContent