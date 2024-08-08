import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div>
        <header className="header">
            <div className="logo">
                <img src="./web.png" alt="Webler Logo" />
                <span className="logo-text">Webler</span>
            </div>
            <div className="auth-buttons">
                <button className="login-button">Log in</button>
                <button className="signup-button">Sign Up</button>
            </div>
        </header>
    </div>
  )
}

export default Header