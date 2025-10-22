import React from 'react';
import '../index.css'
import Navbar from '../layout/Navbar';

const Header = ({ categories }) => {

  return (
      <header className="header">
            <Navbar categories={categories} />
      </header>
    );
  };

export default Header;
