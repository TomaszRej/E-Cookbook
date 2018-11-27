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

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            globalUserName: '',
            data: [],
            ingredients: [],
            favorites: [],
            userID: ''
        }
    }
    resetFavoriteList = () => {
        this.setState({
            favorites: []
        })
    };
    updateFavoriteList = () => {
        fetch('http://localhost:3000/users')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(users => {
                users.forEach((el) => {
                    if (el.name === this.state.globalUserName) {
                        this.setState({
                            favorites: el.favorites,
                        })
                    }
                })
            })
            .catch(err => console.log(err));
    };
    addToFavoritesList = (id) => {
        const favorites = this.state.favorites.slice();
        this.state.data.forEach((el) => {
            if (el.id == id) {
                favorites.push(el);
                const fav = {
                    favorites: favorites
                };
                fetch(`http://localhost:3000/users/${this.state.userID}`, {
                    method: 'PATCH',
                    body: JSON.stringify(fav),
                    headers: {
                        "Content-Type": "application/json" // <--- don't forget this!
                    }
                })
                    .then(response => response.json())
                    .then((res) => {
                        console.log(res, "ODPOWIEDZ");
                    })
                    .catch(error => console.error('Error:', error));
            }
        });

        this.setState({
            favorites: favorites
        })
    };
    removeFromFavoritesList = (id) => {
        const favorites = [];
        this.state.favorites.forEach((el) => {
            if (el.id != id) {
                favorites.push(el);
            }
        });
        fetch(`http://localhost:3000/users/${this.state.userID}`, {
            method: 'PATCH',
            body: JSON.stringify({favorites: favorites}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((res) => {
                console.log(res, "ODPOWIEDZ");
            })
            .catch(error => console.error('Error:', error));

        this.setState({
            favorites: favorites
        })
    };
    updateData = (obj) => {
        const data = this.state.data.slice();
        data.push(obj);
        this.setState({
            data: data
        })
    };
    updateRecipes = (id) => {
        const data = this.state.data.slice();
        const arr = [];

        data.forEach((el) => {
            if (el.id != id) {
                arr.push(el);
            }
        });

        this.setState({
            data: arr
        })
    };
    updateHearts = (id, likes) => {
        const data = this.state.data.slice();
        data.forEach((el) => {
            if (id == el.id) {
                el.likes = likes
            }
        });

        this.setState({
            data: data
        })
    };
    updateWhoLikes = (id, whoLikes) => {
        const data = this.state.data.slice();
        data.forEach((el) => {
            if (id == el.id) {
                el.whoLikes = whoLikes;
            }
        });

        this.setState({
            data: data
        });
    };
    setUserName = (name) => {
        this.setState({
            globalUserName: name,
        })
    };

    setIngredientsState = (ingredients) => {
        const ints = ingredients.slice();
        this.setState({
            ingredients: ints
        })
    };
    filterRecipes = () => {
        const data = this.state.data.map((recipe) => {
            recipe.sort = 0;
            this.state.ingredients.forEach((i) => {
                if (recipe.ingredients.indexOf(i) >= 0) {
                    recipe.sort++;
                }
            });
            return recipe;
        });
        return data;
    };
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
                });
            })
            .catch(err => console.log(err));

        fetch('http://localhost:3000/users')
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(users => {
                console.log(users, 'users z didmount');
                users.forEach((el) => {
                    if (el.name === this.state.globalUserName) {
                        this.setState({
                            favorites: el.favorites,
                            userID: el.id,
                        })
                    }
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Nav globalUserName={this.state.globalUserName} resetFavoriteList={this.resetFavoriteList}
                         setUserName={(name) => this.setUserName(name)}/>
                    <Switch>
                        <Route exact path='/'
                               render={(props) => <Home {...props} filterRecipes={this.filterRecipes}
                                                        data={this.state.data}
                                                        setIngredientsState={this.setIngredientsState}
                                                        updateWhoLikes={this.updateWhoLikes}
                                                        globalUserName={this.state.globalUserName}
                                                        updateData={(obj) => {
                                                            this.updateData(obj)
                                                        }} updateHearts={this.updateHearts}
                                                        updateRecipes={this.updateRecipes}/>}
                        />
                        <Route exact path='/ulubione'
                               render={(props) => <Favorites {...props} favorites={this.state.favorites}
                                                             globalUserName={this.state.globalUserName}/>}
                        />
                        <Route exact path='/recipe/:id'
                               render={(props) => <Recipe {...props} addToFavoritesList={this.addToFavoritesList}
                                                          removeFromFavoritesList={this.removeFromFavoritesList}
                                                          favorites={this.state.favorites}/>}
                        />
                        <Route exact path='/dodawanieProduktu'
                               render={(props) => <AddProduct {...props} updateData={(obj) => {
                                   this.updateData(obj)
                               }} updateRecipes={this.props.updateRecipes}
                                                              globalUserName={this.state.globalUserName}/>}
                        />
                        <Route
                            path='/logowanie'
                            render={(props) => <Login {...props} updateFavoriteList={this.updateFavoriteList}
                                                      userName={this.state.globalUserName}
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