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
import Recipe from './components/Recipe.jsx';
import AddProduct from './components/AddProduct.jsx';
import style from '../sass/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // isUserLogged: false,
            globalUserName: '',
            data: [],
        }
    }

    updateData = (obj) => {
        const data = this.state.data.slice();
        data.push(obj);
        this.setState({
            data: data
        })
    }

    updateHearts = (id, likes) => {
        const data = this.state.data.slice();
        data.forEach((el) => {
                    if (id == el.id) {
                        el.likes = likes
                    }
        })

        this.setState({
            data: data
        })

    }

    setUserName = (name) => {
        localStorage.removeItem('savedName');
        this.setState({
            globalUserName: name,
        }, () => {

        })
    }

    filterRecipes = (ingredient) => {
        const data = this.state.data.slice();
        const arr = [];
        console.log(ingredient,'data w metodzie filter');
        console.log(data,'wmet filter');
        data.forEach((el) =>{
            //console.log(el.ingredients);
            for(const i of el.ingredients){
                //console.log(i,'pojedynczy skladnik');
                if(i === ingredient){
                    arr.push(el);
                }
            }
        });
        //data.filter((el)=>{el.ingri === ingredient})

        this.setState({
            data: arr
        })
    }


    // checkUserPassword = (pass) => {
    //    zapytac o user password czy input kontrolowany czy jak ?

    // }

    componentDidMount() {

        const userName = localStorage.getItem("savedName");


        fetch('http://localhost:3000/recipes')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(data => {
                this.setState({
                    data: data,
                    globalUserName: userName
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
                        <Route exact path='/'
                               render={(props) => <Home {...props} filterRecipes={this.filterRecipes} data={this.state.data} globalUserName={this.state.globalUserName} updateData={(obj) => {
                                   this.updateData(obj)
                               }} updateHearts={this.updateHearts}/>}/>



                        <Route exact path='/recipe/:id' component={Recipe}/>
                        {/*<Route path='/dodawanieProduktu' component={AddProduct globalUser}/>*/}

                        <Route exact path='/dodawanieProduktu'
                               render={(props) => <AddProduct {...props} updateData={(obj) => {
                                   this.updateData(obj)
                               }} globalUserName={this.state.globalUserName}/>}/>
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