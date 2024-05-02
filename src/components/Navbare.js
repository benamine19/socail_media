import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlay, faPlus, faVideoCamera, faSearch } from '@fortawesome/free-solid-svg-icons';
import photo from '../images/ai5.jpg'; // Importation de l'image correctement
import { useDispatch, useSelector } from 'react-redux';
import { user_do_login } from '../redux/user_loginRducer';

function Navbare() {
  const state = useSelector(state => state.user_login);

  // Check if user object exists before accessing profile_pic
  const profilePic = state.user?.profile_pic; // Use optional chaining

  // Construct the complete URL conditionally to avoid errors
  const urlComplet = profilePic ? `http://127.0.0.1:8000${profilePic}` : null;

  return (
    <div className='flex justify-between items-center bg-slate-200 h-10 '>
      <div className='w-1/12 mt-2 ml-2'>
        <h3 className="mb-3 text-xl font-extrabold text-dark-grey-900">Register </h3>
      </div>
      <div className='items-center'>
        <button className='bg-zinc-200 rounded-full '>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input className='w-96 rounded-3xl bg-zinc-200' type='search' placeholder='Search for Creators, Inspirations and Project' />
      </div>
      <div className='w-1/6 items-center flex justify-around'>
        <FontAwesomeIcon className='rounded-full bg-neutral-400 p-1' icon={faPlus} />
        <FontAwesomeIcon className='rounded-full bg-neutral-400 p-1' icon={faVideoCamera} />
        <img src={urlComplet ? urlComplet : photo} className='rounded-full w-7 h-7 ' alt='AI' /> {/* Use default image if profile_pic is null */}
      </div>
    </div>
  );
}

export default Navbare;