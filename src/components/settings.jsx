import React from 'react';
import { Link } from 'react-router-dom';
import {getCurrentUser} from '../services/authService';

const Settings = () => {
  return (
    <div>
      <h1>SETTINGS</h1>
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to='/products'>PRODUCTS</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/eventTypes'>EVENT TYPES</Link>
        </li>
        <li className='list-group-item'>
          <Link to='/colors'>COLORS</Link>
        </li>
        <li className='list-group-item'>
          <Link to={`/users/${getCurrentUser().id}`}>ACCOUNT</Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
