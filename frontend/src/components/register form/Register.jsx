import React from 'react';
import '../UserForm.css';


class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value});    
    }
    
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    }

    onSubmitRegister = async () => {
        const { signIn, changeRoute, loadUser } = this.props;

        const response = await fetch('http://localhost:5000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })

        const user = await response.json();
        if (user.id){
            loadUser(user);
            signIn()
            changeRoute('home'); 
        }
    }

    render() {
        const { changeRoute } = this.props;
        return ( 
            <div className='ba shadow-3 dark-gray b--black-10 mv4 w-200 w-50-m w-25-1 mw5 center'>
                <main className="pa4 black-80">
                    <div className="measure center user-form">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" 
                                onChange={this.onNameChange}/>
                            </div>
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
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up" 
                            onClick={() => { 
                                this.onSubmitRegister();
                            }}/>
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" className="f6 link dim black db pointer" onClick={() => changeRoute('signin')}>Sign in</a>
                        </div>
                    </div>
                </main>
            </div>
            
            );
    }
}
    
export default Register;