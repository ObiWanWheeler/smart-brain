import React from 'react';
import '../UserForm.css';


const Signin = ({ changeRoute, signIn }) => {
    return ( 
        <div className='ba shadow-3 dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center'>
            <main className="pa4 black-80">
                <div className="measure center user-form">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
                        onClick={() => { 
                            signIn();
                            changeRoute('home'); 
                        }}/>
                    </div>
                    <div className="lh-copy mt3">
                        <a href="#0" className="f6 link dim black db" onClick={() => changeRoute('register')}>Sign up</a>
                    </div>
                </div>
            </main>
        </div>
        
        );
    }
    
    export default Signin;