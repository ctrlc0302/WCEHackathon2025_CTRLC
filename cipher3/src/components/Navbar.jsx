import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white rounded-t-md shadow-lg">
      <div className="max-w-7xl -mx-0 sm:px-6 lg:px-0 ">
        <div className="flex justify-evenly items-center h-14 w-20">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="-ml-7 flex items-baseline space-x-5">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-[#bae6fd] text-white px-3 py-2 rounded-md text-sm font-medium" 
                      : "text-gray-300 hover:bg-[#bae6fd] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Login
                </NavLink>
                
                <NavLink 
                  to="/Home" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-[#bae6fd] text-white px-3 py-2 rounded-md text-sm font-medium" 
                      : "text-gray-300 hover:bg-[#bae6fd] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Home
                </NavLink> 
                <NavLink 
                  to="/savings" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-[#bae6fd] text-white px-3 py-2 rounded-md text-sm font-medium" 
                      : "text-gray-300 hover:bg-[#bae6fd] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Savings
                </NavLink>
                
                <NavLink 
                  to="/PaymentCategorization" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-[#bae6fd] text-white px-3 py-2 rounded-md text-sm font-medium" 
                      : "text-gray-300 hover:bg-[#bae6fd] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  Categories
                </NavLink>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                type="button" 
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {/* This would need JavaScript to toggle based on button click, but showing structure here */}
      <div className="hidden md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/savings" 
            className={({ isActive }) => 
              isActive 
                ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Savings
          </NavLink>
          
          <NavLink 
            to="/PaymentCategorization" 
            className={({ isActive }) => 
              isActive 
                ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" 
                : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Payment Categories
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;