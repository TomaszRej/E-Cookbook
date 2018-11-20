import React from "react";

class Login extends React.Component {


    render() {

        console.log(this.props.userName);
        return (
            <div>
                <h2>Zaloguj się</h2>
                <form>
                    <label htmlFor='userLogin'>Wpisz imię lub email</label>
                    <input value={this.props.userName} onChange={this.handleUserName} type='text' id='userLogin'/>
                    <label htmlFor='password'>Podaj hasło</label>
                    <input type='password' id='password'/>
                    <button type='submit'>Potwierdż</button>
                </form>
            </div>
        )
    }
}

export default Login;