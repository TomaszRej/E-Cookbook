import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends React.Component {

    handleLoginClick = () => {
        console.log(this.props.globalUserName);
        console.log('test klik');
        if (this.props.globalUserName) {
            if (typeof this.props.setUserName === 'function') {
                this.props.setUserName('');
            }
        }
    }

    render() {
        const style = {
            display: this.props.globalUserName ? 'inline-block' : 'none',
        }
        const text = this.props.globalUserName ? 'Wyloguj' : 'Zaloguj';

        return (

            <header className='header container'>
                <h1 className='logo'>E-Przepsiy</h1>
                <nav>
                    <ul className='nav'>
                        <li className='nav-link'><NavLink className='nav-link-a' activeClassName='activeNavLink' exact
                                                          to='/'>Strona
                            główna </NavLink></li>
                        <li style={style} className='nav-link'><NavLink className='nav-link-a'
                                                                        activeClassName='activeNavLink' exact
                                                                        to='/ulubione'>Ulubione</NavLink></li>
                    </ul>
                </nav>
                <div>
                    <div className='userIcon'><i className="far fa-user"></i>{  this.props.globalUserName}</div>
                </div>
                <div>
                    <button className='addRecipeBtn'><NavLink to='/dodawanieProduktu'>Dodaj</NavLink></button>
                    <button onClick={this.handleLoginClick} className='loginBtn'><NavLink
                        to='/logowanie'>{text}</NavLink></button>
                </div>
            </header>
        );
    }
}

export default Nav;