import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (

            <header className='header container'>
                <h1 className='logo'>E-Przepsiy</h1>
                <nav>
                    <ul className='nav'>
                        <li className='nav-link'><NavLink className='nav-link-a' activeClassName='activeNavLink' exact to='/'>Strona
                            główna </NavLink></li>
                        <li className='nav-link'><NavLink className='nav-link-a' activeClassName='activeNavLink' exact
                                                          to='/ulubione'>Ulubione</NavLink></li>
                    </ul>
                </nav>
                <div>
                    <button className='addRecipeBtn'><Link  to='/dodawanieProduktu'>Dodaj</Link></button>
                    <button className='loginBtn'><Link  to='/logowanie'>Zaloguj</Link></button>
                </div>
            </header>
        );
    }
}

export default Nav;