import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="products">Product Management</Link>
        </li>
        <li>
          <Link to="users">User Management</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;