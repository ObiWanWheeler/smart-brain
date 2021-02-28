import React from 'react';
import '../UserForm.css';


class Signin extends React.Component {
    
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = async () => {
        const { loadUser, signIn, changeRoute } = this.props;

        const response = await fetch('http://localhost:5000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })

        const user = await response.json();
        if (user.id) {
            loadUser(user);
            signIn();
            changeRoute('home'); 
        }
    }

    render() {
        const { changeRoute } = this.props; 
        return ( 
            <article className='br3 ba shadow-3 dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw5 center'>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
                                onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
                                onChange={this.onPasswordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
                            onClick={() => { 
                                this.onSubmitSignIn();
                            }}/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db" onClick={() => changeRoute('register')}>Sign up</a>
                        </div>
                    </div>
                </main>
            </article>
            
        );
    }
}
    
    export default Signin;