import React from 'react';
import '../style/index.scss';
import '../style/navbar.scss';

const Navbar = ({darkMode, setDarkMode})=> {

    return (
        <div className='navbar'>    
            <div className='leftSide'>
                <div onClick={()=>{
                    //Setting to persist after reload
                    localStorage.setItem('darkMode', (darkMode === 'true') ? 'false' : 'true');
                    //Changing the state
                    setDarkMode((darkMode === 'true') ? 'false' : 'true');
                     }} className={(darkMode === 'true') ? 'darkIcon' : 'lightIcon'}></div>
            </div>
        </div>
    );
}

export default Navbar;