import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import img1 from '../logo.png';
import img2 from '../cart.png';
import Context from '../context/context';

const Header = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [debouncedTerm, setDebouncedTerm] = useState(''); // Debounced term state
  const refOne = useRef(null);
  const context = useContext(Context)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const location = useLocation();
  const [search, setSearch] = useState(searchQuery);

  // Get the initial search query from the URL when the component mounts
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      setSearch(query);
      setSearchTerm(query); // Initialize searchTerm based on URL
    }
  }, [location.search]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "GET",
        credentials: 'include'
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message, {
          className: 'custom-toast',
        });
        dispatch(setUserDetails(""));
        navigate('/');
      } else if (responseData.error) {
        toast.error(responseData.message, {
          className: 'custom-toast',
        });
      }
    } catch (error) {
      toast.error('An error occurred while logging out. Please try again.', {
        className: 'custom-toast',
      });
      console.error('Logout error:', error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (refOne.current && !refOne.current.contains(e.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce effect: Update debounced term after user has stopped typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm); // Update the debounced term
    }, 500);

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again
    };
  }, [searchTerm]);

  // Trigger navigation when debouncedTerm updates, use 'replace' to avoid URL reset
  useEffect(() => {
    if (debouncedTerm) {
      navigate(`/search?q=${debouncedTerm}`, { replace: true });
    }
  }, [debouncedTerm, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
    setSearch(e.target.value);
  }

  return (
    <header className="h-16 bg-header-gradient shadow-md fixed w-full z-20">
      <div className="h-full w-full flex items-center justify-between px-6 mx-0">
        <div className="flex items-center">
          <Link to={'/'}><img className="h-16" src={img1} alt="logo" /></Link>
        </div>
        <div className='hidden sm:flex h-9 w-[33.33%] cursor-pointer items-center flex-row-reverse justify-between pr-3 gap-3 hover:bg-orange-600 bg-orange-400'>
          <div><FiSearch /></div>
          <input
            placeholder='Search Items...'
            className='h-9 w-[100%] outline-none px-4 text-sm'
            type="text"
            value={search} // Bind the input value to searchTerm
            onChange={handleSearchChange} // Use handleSearchChange function
          />
        </div>
        <div>
          <div className='flex items-center justify-center gap-6'>
            {
              user._id ?
                <button onClick={handleLogout} className='bg-orange-400 px-4 h-8 hover:bg-orange-600 rounded-sm shadow-md text-sm'>Logout</button> :
                <Link to={'/login'}><button className='bg-orange-400 px-4 h-8 hover:bg-orange-600 rounded-sm shadow-md text-sm'>Login</button></Link>
            }

            <div className='flex h-12 w-16 items-center justify-center relative'>
              <Link to={'/cart'}><img className="h-7 cursor-pointer" src={img2} alt="cart" /></Link>
              <div className='flex absolute text-sm w-5 h-5 items-center justify-center top-1 right-0 rounded-full bg-orange-400'>{user._id && context?.cardItemCount}</div>
            </div>
            {user._id? <div className='relative'>
              
              <img onClick={() => { setMenu(prev => !prev) }} className="h-10 cursor-pointer rounded-full" src={user.profileImage ? user.profileImage : "assets/user.png"} alt={user.name} />
              {menu &&
                <div className='dropDown' ref={refOne}>
                  {user.role === 'ADMIN' &&
                    <Link to={'/admin-panel/products'}><p className=''>Admin Panel</p></Link>
                  }
                  <Link to={'/profile'}><p className=''>User Profile</p></Link>
                </div>
              }
            </div>:  <img className="h-10 cursor-pointer rounded-full" src={"assets/user.png"} alt={user.name} />}
           
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
