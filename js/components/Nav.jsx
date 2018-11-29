import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

class Nav extends React.Component {
    handleLoginClick = () => {
        if (this.props.globalUserName) {
            if (typeof this.props.setUserName === 'function') {
                this.props.setUserName('');
            }
            if (typeof this.props.resetFavoriteList === 'function') {
                this.props.resetFavoriteList();
            }
        }
    };

    render() {
        const style = {
            display: this.props.globalUserName ? 'inline-block' : 'none',
        };
        const text = this.props.globalUserName ? 'Wyloguj' : 'Zaloguj';
        const styleForAddBtn = {display: !this.props.globalUserName && 'none'};

        return (
            <header className='header container'>
                <h1 className='logo'>E-Przepsiy</h1>
                <nav>
                    <ul className='nav'>
                        <li className='nav-link'><NavLink className='nav-link-a' activeClassName='activeNavLink' exact
                                                          to='/'>Strona główna </NavLink></li>
                        <li style={style} className='nav-link'><NavLink className='nav-link-a'
                                                                        activeClassName='activeNavLink' exact
                                                                        to='/ulubione'>Ulubione</NavLink></li>
                    </ul>
                </nav>
                <div>
                    <div className='userIcon'><i
                        className="far fa-user"></i>{this.props.globalUserName ? this.props.globalUserName : '___________'}
                    </div>
                </div>
                <div>
                    <button style={styleForAddBtn} className='addRecipeBtn'><NavLink
                        to='/dodawanieProduktu'>Dodaj</NavLink></button>
                    <button onClick={this.handleLoginClick} className='loginBtn'><NavLink
                        to='/logowanie'>{text}</NavLink></button>
                </div>
            </header>
        );
    }
}

Nav.propTypes = {
    globalUserName: PropTypes.string,
    resetFavoriteList: PropTypes.func,
    setUserName: PropTypes.func
};

export default Nav;