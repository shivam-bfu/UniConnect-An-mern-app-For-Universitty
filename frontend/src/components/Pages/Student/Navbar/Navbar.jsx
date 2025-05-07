import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fb from '../../../../assets/fb.jpg';
import menu from '../../../../assets/menu.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBlog, faMessage, faDonate, faCalendarDays, faReceipt, faLaptopCode, faNoteSticky, } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="myNavbar ">
      <div className="navbar ">
        <nav className="container">
        <button className="relative group text-2xl uppercase tracking-widest font-sans text-transparent transition-all duration-500">
  <span className="absolute inset-0 w-0 border-r-4 border-green-400 overflow-hidden text-green-400 transition-all duration-500 group-hover:w-full group-hover:drop-shadow-[0_0_23px_#37FF8B]">
    UNIconnect
  </span>
  <span className="relative z-10 text-gray-400 group-hover:text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>
  UNIconnect
    
  </span>
</button>




          {/* Search Bar */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
            <li>
              <Link to="/" onClick={() => setActiveLink('home')} className={activeLink === 'home' ? 'active' : ''}>
                <FontAwesomeIcon icon={faHouse} className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/posts" onClick={() => setActiveLink('posts')} className={activeLink === 'posts' ? 'active' : ''}>
                <FontAwesomeIcon icon={faBlog} className="nav-icon" />
                <span>Posts</span>
              </Link>
            </li>
            <li>
              <Link to="/messages" onClick={() => setActiveLink('messages')} className={activeLink === 'messages' ? 'active' : ''}>
                <FontAwesomeIcon icon={faMessage} className="nav-icon" />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={() => setActiveLink('events')} className={activeLink === 'events' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/myai" onClick={() => setActiveLink('myai')} className={activeLink === 'myai' ? 'active' : ''}>
                <FontAwesomeIcon icon={faReceipt} className="nav-icon" />
                <span>My AI</span>
              </Link>

            </li>

            <li>
           

            </li>



          </ul>

          {/* <button
          onClick={() => {
            setIsLoggedIn(!isLoggedIn);
            setActiveLink(isLoggedIn ? '' : 'login');
          }}
          className={`btn ${activeLink === 'login' ? 'active-btn' : ''}`}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button> */}

          <img src={menu} alt="Menu Icon" className="menu-icon" onClick={toggleMenu} />
        </nav>
      </div>

  
    </div>
  );
};

export default Navbar;
