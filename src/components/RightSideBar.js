import React, { useEffect, useState } from 'react'
import {faCameraRotate ,faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import photo from '../images/ai5.jpg'; // Importation de l'image correctement
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { click_sur_ami,fermer_disscusion } from '../redux/boite_disscussion';
import useDebounce from './use_Debounce';
function RightSideBar() {
  const [amies, setAmies] = useState([]);
  const [search_value, setSearch_value] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const state = useSelector((state) => state.user_login.user.user_id);
  const debounce=useDebounce(search_value,500)
  const handlecklick_ami=(ami_id,ami_username,ami_profile_pic,id_group)=>{
      dispatch(click_sur_ami({ id_amie: ami_id,name_amie: ami_username,profile_pic_amie:ami_profile_pic,id_group:id_group}));
  }


  const get_amies=async()=>{
    try{
      const user_id = state;
      const response = await axios.post(
        "http://127.0.0.1:8000/users/user_views_amies/",
        { 'user_id': user_id, 'username': search_value } 
      ); 
      console.log('response.data  ::::', response.data.amis)
      setAmies(response.data.amis)
      setLoading(false)
    }catch(error){
      console.error(error);
      setError(
        "Une erreur s'est produite lors du chargement des amies"
      );
      setLoading(false);
    }
  }
  useEffect(() => {
    get_amies();
  }, [debounce]);

  if (loading) {
    return    <div className="flex items-center justify-center h-20">
                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className='rounded w-4/12 m-3 bg-white'>
      <div className='flex justify-between p-3'>
         <div className='text-base font-bold'> Message</div>
        <div>
            <FontAwesomeIcon className='rounded-full bg-neutral-400 p-1' icon={faCameraRotate} />
         </div>
      </div>
      <div className='flex items-center ml-2 mt-2 mb-8'>
               <FontAwesomeIcon className='rounded-full bg-zinc-200 p-1' icon={faSearch} />
               <input type='text' placeholder='chercher'
                  onChange={(e) => setSearch_value(e.target.value)}
                  value={search_value}
                  className=' rounded-3xl bg-zinc-200 w-4/5'/>      
      </div>
      <hr className='mt-6'/>
              {/* amies */}
              <div>
              {amies.map((ami) => ( 
                        <div className='flex items-center p-2 cursor-pointer' onClick={()=>{handlecklick_ami(ami.user.id,ami.user.username,ami.user.profile_pic,ami.group.id)}}>
                
                          <div>
                          <img src={`http://127.0.0.1:8000${ami.user.profile_pic}`} className='rounded-full w-9 h-9 mr-1' alt='AI' /> 
                          </div>
                    
                          <div>
                          <div className='text-base font-bold'>{ami.user.username}</div>
                            <div className='gg'>active depuis 1 heure</div>
                          </div>
                    
                         </div>
                   
              ))}
              </div>
              {/* fin amies */}
              



















    </div>
  )
}

export default RightSideBar

