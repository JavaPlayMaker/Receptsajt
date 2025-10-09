import React from 'react';
import '../index.css'

function Header() {
  return (
    <header className="header">
        <div className="logo">
                <img src="https://media.discordapp.net/attachments/1425418151830491146/1425418250249961522/RICE_N_ROLL.png?ex=68e783b1&is=68e63231&hm=4431589a10666a0dd9c9d01d785287d58879d1b3e07598f72eace12d4acee92f&=&format=webp&quality=lossless" alt="Loga RICE N ROLL" className='header-img'/>
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
