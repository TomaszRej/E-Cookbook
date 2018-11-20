import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import Home from './components/Home.jsx';
import Favorites from './components/Favorites.jsx';
import Login from './components/Login.jsx';
import Nav from './components/Nav.jsx';
import style from '../sass/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLogged: false,
            userName: 'test',
            data: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/db')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Bład?!');
            })
            .then(data => {
                this.setState({
                    data: data
                }, () => {
                    console.log(this.state.data, 'dane state callback z jsonserver');
                });
            })
            .catch(err => console.log(err));
    }


    render() {


        return (
            <HashRouter>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/ulubione' component={Favorites}/>
                        {/*<Route path='/pricing' component={Pricing} />*/}
                        {/*<Route path='/logowanie' component={Login userName={this.state.userName}}/>*/}
                        <Route
                            path='/logowanie'
                            render={(props) => <Login {...props} userName={this.state.userName}/>}
                        />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});