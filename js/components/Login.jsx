import React from "react";

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            register: false,
            userName: '',
            password: '',
            repeatPassword: ''
        }
    }
    handleUserName = (e) => {

        const name = e.target.value;
        if(typeof this.props.checkUserName === 'function'){
            this.props.checkUserName(name)
        }

        this.setState({
            userName: name,
        },()=>{
            console.log(this.state.userName);
        })
    }

    toggleActiveState = () => {
        this.setState({
            register : !this.state.register,
        },()=>{
            console.log(this.state.register);
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }
    handleRepeatPassword = (e) => {
        this.setState({
            repeatPassword: e.target.value,
        })
    }

    validateLogin = (e) => {
        e.preventDefault();
        console.log('test');
        console.log(this.state.userName);
        console.log(this.state.password);
        console.log(this.state.repeatPassword);
    }





    render() {
        const text = this.state.register ? 'Zarejestruj' : 'Zaloguj';
        return (
            <div className='login'>
                {/*<h2><button>Loguj</button><button>Rejestruj</button></h2>*/}
                <h2><p onClick={this.toggleActiveState}className={this.state.register ? null : 'activeNavLink'}>Loguj</p><p onClick={this.toggleActiveState} className={this.state.register ? 'activeNavLink' : null}>Rejestruj</p></h2>
                <form onSubmit={this.validateLogin}>
                    <label htmlFor='userLogin'>Wpisz imię lub email</label>
                    <input placeholder='Wpisz imię' value={this.state.userName} onChange={this.handleUserName} type='text' id='userLogin'/>
                    <label htmlFor='password'>Podaj hasło</label>
                    <input placeholder='Podaj hasło' type='password' id='password' onChange={this.handlePassword}/>
                    <input style={{display: this.state.register ? 'block' : 'none'}}placeholder='Powtórz hasło' type='password' id='repeatPassword' onChange={this.handleRepeatPassword}/>
                    <button type='submit'>{text}</button>
                </form>
            </div>
        )
    }
}

export default Login;