import React from 'react';
import logo from '../../public/cdm-logo.png';
import { Link, NavLink, useNavigate} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const classLink = ({ isActive }) => isActive ? 'text-amber-600 font-bold underline' : 'font-bold underline';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='bg-gray-950 text-white font-poppins'>
      <div className='container mx-auto p-6 flex flex-col justify-center items-start space-y-5'>
        
        <div className="flex flex-row justify-center items-center space-x-2">
          <Link to = "/"><img src={ logo } alt="cdm-logo" className='w-20'/></Link>
          <h3 className='font-bold text-lg uppercase'>Predictive Vital Signs Patient Monitoring and Recording Kiosk for Philippines Health Centers Applying Long Short-Term Memory Algorithm</h3>
        </div>

        <div className='flex space-x-5 ml-20 pl-2'>
          <NavLink to='/dashboard' className={ classLink }>
            Profile
          </NavLink>

          <NavLink to='/settings' className={ classLink }>
            Settings
          </NavLink>

          <NavLink to='/logout' className={ classLink } onClick={(e) => handleLogout(e)}>
            Logout
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header