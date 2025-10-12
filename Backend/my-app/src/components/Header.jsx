import React from 'react';
import '../index.css'

function Header() {
  return (
    <header className="header">
        <div className="logo">
                <img src="..\assets\RICE N ROLL.png" alt="Loga RICE N ROLL" className='header-img'/>
        </div>
      <nav>
        <ul>
          <li>Rice Rolls</li>
          <li>Pasta</li>
          <li>Kyckling</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
