import React from "react";

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