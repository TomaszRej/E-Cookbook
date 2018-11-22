import React from "react";
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            register: false,
            redirect: '',
            userName: '',
            newUserName: '',
            password: '',
            newPassword:'',
            repeatPassword: '',
            errors: [],
        }
    }
    handleUserName = (e) => {

        const name = e.target.value;
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

    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value,
        },()=>{
            console.log(this.state.newPassword);
        })
    }

    handleRepeatPassword = (e) => {
        this.setState({
            repeatPassword: e.target.value,
        },()=> {
            console.log(this.state.repeatPassword);
        })
    }

    validateLogin = (e) => {
        e.preventDefault();
        const errors = [];
        if(this.state.userName.length === 0 ){
            errors.push('Wprowadż hasło i nazwę użytkownika!!');
            this.setState({
                errors: errors
            })
            return;
        }
        fetch(`http://localhost:3000/users?name=${this.state.userName}`,)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(user => {
                    if(user[0].password === this.state.password){
                        console.log('prawidlowe chaslo');
                        console.log(this.state.userName);
                        const userName = this.state.userName;
                        localStorage.setItem('savedName', userName);

                    }else {
                        //console.log('podales niepoprawne chaslo');
                        errors.push('Podałeś nieprawidłowe hasło!!!');
                    }

                console.log(errors.length, 'dlugosc tablicy z bledami');
                if(errors.length !== 0) {
                    this.setState({
                        errors: errors
                    })
                }else {
                    this.setState({
                        redirect: '/',
                        errors: errors
                    })
                }


            })
            .catch(()=>{
                errors.push('Użytkownik nie istniej!!!');

                if(errors.length !== 0) {
                    this.setState({

                        errors: errors
                    })
                }else {

                    this.setState({
                        redirect: '/',
                        errors: errors
                    })
                }

            });


        if(typeof this.props.setUserName === 'function'){
            this.props.setUserName(this.state.userName);
        }

    }

    handleNewUserName = (e) => {
        const name = e.target.value;
        this.setState({
            newUserName: name,
        },()=>{
            console.log(this.state.newUserName);
        })
    }

    validateRegister = (e) => {
        e.preventDefault();
        const errors = [];
        if(this.state.newUserName.length === 0 ){
            errors.push('Podaj nową nazwę użytkownika!!');
            this.setState({
                errors: errors
            })
            return;
        }

        fetch(`http://localhost:3000/users?name=${this.state.newUserName}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(user => {

                    errors.push(`Użytkownik ${user[0].name} już istnieje!!!`);

                // if(errors.length !== 0) {
                //     this.setState({
                //         errors: errors
                //     })
                // }else {
                //     this.setState({
                //         redirect: '/',
                //         errors: errors
                //     })
                // }

                this.setState({
                    errors: errors
                })


            })
            .catch(()=>{
                const data = {
                    //name: this.state.newUserName,
                    //password: this.state.newPassword,
                    name: this.state.newUserName,
                    password: this.state.newPassword
                }
                    if(this.state.newPassword === this.state.repeatPassword){
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json" // <--- don't forget this!
                            }
                        })
                            .then(response => response.json())
                            .then(()=>{
                                // to do
                                if(typeof this.props.setUserName === 'function'){
                                    this.props.setUserName(this.state.newUserName);
                                }
                                this.setState({
                                    redirect: '/'
                                })
                            })
                            .catch(error => console.error('Error:', error));
                    }else {
                        errors.push("Hasła są niezgodne");
                    }
                this.setState({
                    errors: errors
                })
            });




    }





    render() {
        if(this.state.redirect !== ''){
            return <Redirect to={this.state.redirect}/>
        }
        const text = this.state.register ? 'Zarejestruj' : 'Zaloguj';

        let errors = '';
        if(this.state.errors.length !== 0) {
             errors = this.state.errors.map((el)=>{
                return <p>{el}</p>;
            });
        }

        let form = '';
        if(this.state.register){
            form = <div className='login'>
                {/*<h2><button>Loguj</button><button>Rejestruj</button></h2>*/}
                <h2><p onClick={this.toggleActiveState}className={this.state.register ? null : 'activeNavLink'}>Loguj</p><p onClick={this.toggleActiveState} className={this.state.register ? 'activeNavLink' : null}>Rejestruj</p></h2>
                <form onSubmit={this.validateRegister}>
                    <label htmlFor='userLogin'>Wpisz imię lub email</label>
                    <input placeholder='Wpisz imię' value={this.state.newUserName} onChange={this.handleNewUserName} type='text' id='userLogin'/>
                    <label htmlFor='password'>Podaj hasło</label>
                    <input placeholder='Podaj hasło' type='password' id='newPassword' onChange={this.handleNewPassword}/>
                    <input placeholder='Powtórz hasło' type='password' id='repeatPassword' onChange={this.handleRepeatPassword}/>
                    <button type='submit'>{text}</button>
                </form>
            </div>;
        }else{
            form =  <div className='login'>
                {/*<h2><button>Loguj</button><button>Rejestruj</button></h2>*/}
                <h2><p onClick={this.toggleActiveState}className={this.state.register ? null : 'activeNavLink'}>Loguj</p><p onClick={this.toggleActiveState} className={this.state.register ? 'activeNavLink' : null}>Rejestruj</p></h2>
                <form onSubmit={this.validateLogin}>
                    <label htmlFor='userLogin'>Wpisz imię lub email</label>
                    <input placeholder='Wpisz imię' value={this.state.userName} onChange={this.handleUserName} type='text' id='userLogin'/>
                    <label htmlFor='password'>Podaj hasło</label>
                    <input placeholder='Podaj hasło' type='password' id='password' onChange={this.handlePassword}/>
                    {/*<input style={{display: this.state.register ? 'block' : 'none'}}placeholder='Powtórz hasło' type='password' id='repeatPassword' onChange={this.handleRepeatPassword}/>*/}
                    <button type='submit'>{text}</button>
                </form>
            </div>
        }

        return (
            <div>
                <div style={{display: this.state.errors.length !== 0 ? 'block': 'none'}}className='errors'>{errors}</div>
                {form}
            </div>
        )
    }
}

export default Login;