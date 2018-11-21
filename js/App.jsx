import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Redirect,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import Home from './components/Home.jsx';
import Favorites from './components/Favorites.jsx';
import Login from './components/Login.jsx';
import Nav from './components/Nav.jsx';
import Recipe from './components/Recipe.jsx'
import style from '../sass/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserLogged: false,
            globalUserName: '',
            data: [],

        }
    }

    setUserName = (name) => {

        this.setState({
            globalUserName: name,
        },()=>{

        })


    }







    // checkUserPassword = (pass) => {
    //    zapytac o user password czy input kontrolowany czy jak ?

    // }

    componentDidMount() {
        fetch('http://localhost:3000/recipes')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(data => {
                this.setState({
                    data: data
                }, () => {
                    //console.log(this.state.data, 'dane state callback z jsonserver');
                });
            })
            .catch(err => console.log(err));
    }


    render() {


        return (
            <HashRouter>
                <div>
                    <Nav globalUserName={this.state.globalUserName} setUserName={(name) => this.setUserName(name)}/>
                    <Switch>
                        {/*<Route exact path='/' component={Home}/>*/}
                        <Route exact path='/' render={(props) => <Home {...props} data={this.state.data}/>}/>
                        <Route exact path='/ulubione' component={Favorites}/>
                        <Route exact path='/recipe/:id' component={Recipe}/>

                        <Route
                            path='/logowanie'
                            render={(props) => <Login {...props} userName={this.state.globalUserName}
                                                      setUserName={(name) => this.setUserName(name)}/>}
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