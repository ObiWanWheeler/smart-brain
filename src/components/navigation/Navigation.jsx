import React from 'react';
import './Navigation.css';

const Navigation = ({ changeRoute, isSignedIn, signOut }) => {
    if (isSignedIn) {
        return (
            <nav className={'Navbar'}>
                <p className='f3 link dim black underline pa3 pointer' 
                onClick={() => { 
                    signOut(); 
                    changeRoute('signin');
                    }}>
                Sign Out</p>
            </nav>
        );
    }
    else {
        return (
            <nav className={'Navbar'}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => changeRoute('signin')}>Sign In</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => changeRoute('register')}>Sign Up</p>
            </nav>
        );
    }    
};

export default Navigation;