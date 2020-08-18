import React from 'react'

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img src="logo.svg" alt="Icon home" className="w-64 mb-8 md:mb-0"/>
    </header>
  );
}
 
export default Header;