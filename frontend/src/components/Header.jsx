import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../hooks/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Disaster Management</Link>
        </h1>
        <nav className="space-x-4">
          {/* <Link to="/" className="hover:underline">
            Home
          </Link> */}
          <Link to="/crisis" className="hover:underline">
            Crisis
          </Link>
          <Link to="/volunteer" className="hover:underline">
            Volunteer
          </Link>
          <Link to="/donation" className="hover:underline">
            Donation
          </Link>

          {user ? (
            <>
              {user.isAdmin && (
                <>
                  <Link to="/admin/reports" className="hover:underline">
                    Admin Reports
                  </Link>
                </>
              )}
              <Link to="/account" className="hover:underline">
                Account
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 py-2 px-4 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
