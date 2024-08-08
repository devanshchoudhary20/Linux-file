import React from 'react'
import './Header.css'
const Header = () => {


  return (
    <div className="header">
      <div className="greeting-text">
        <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44b.png" className = "greeting-icon icon" alt="" />
        &nbsp;
        Good evening
        <div className="quote">
          Productivity is the key to success!
        </div>
      </div>
      
      <div className="user-profile">
        <button className='user-button'>
          <div className="user">
            <img src="./woman.png" className='user-icon icon' alt="" />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Header;