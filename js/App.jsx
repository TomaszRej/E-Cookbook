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
            globalUserName: '',
            data: [],
            ingredients: [],
            favorites: [],
            userID: ''
        }
    }

    addToFavoritesList = (id) => {
        console.log('z update favorite list');
        const favorites = this.state.favorites;
        this.state.data.forEach((el)=>{
            console.log(el.id,id,'porownanie');
            console.log(favorites);
            if(el.id == id){
                favorites.push(el);
                const fav = {
                    favorites: favorites
                };
                console.log(this.state.globalUserName);
                // fetch(`http://localhost:3000/users/${this.state.globalUserName}`, {
                // zmienic zeby nie  na sztywno
                fetch(`http://localhost:3000/users/${this.state.userID}`, {

                    method: 'PATCH',
                    body: JSON.stringify(fav),
                    headers: {
                        "Content-Type": "application/json" // <--- don't forget this!
                    }
                })
                    .then(response => response.json())
                    .then((res)=>{
                        console.log(res,"ODPOWIEDZ");
                    })
                    .catch(error => console.error('Error:', error));

            }
        });
        this.setState({
            favorites: favorites
        },()=>{
            console.log(this.state.favorites);
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
            console.log(typeof el.id);
            console.log(typeof id);
            if(el.id != id){
                arr.push(el);
            }
        });

        console.log(data,'xxxxxxxxxxxxxxxxxx');

        console.log("updateRECIPES");
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
    updateWhoLikes = (id,whoLikes) => {
        console.log("''''''''''''''''''");
        console.log(id);
        console.log(whoLikes);
        console.log('123456789900');

        const data = this.state.data.slice();
        data.forEach((el) => {
            if (id == el.id) {
                el.whoLikes = whoLikes;
            }
        });

        this.setState({
            data: data
        });
        console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;');
    };

    setUserName = (name) => {
        localStorage.removeItem('savedName');
        this.setState({
            globalUserName: name,
        }, () => {

        })
    };


    setIngredientsState = (ingredients) => {
        const ints = ingredients.slice();
        this.setState({
            ingredients: ints
        })
    };

    filterRecipes = () => {
       const data= this.state.data.map((recipe)=>{
            recipe.sort = 0;
            console.log(this.state.ingredients,'skladniki');
            this.state.ingredients.forEach((i)=>{
                console.log(recipe.ingredients,i,'=======');
                if(recipe.ingredients.indexOf(i) >= 0){
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
                }, () => {
                    console.log(this.state.data, 'dane state callback z jsonserver');
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
                    console.log(users,'users z didmount');
                    users.forEach((el) => {
                        if(el.name === this.state.globalUserName){
                            // console.log(el.name, this.state.globalUserName,'user aktualny');
                            console.log(el.favorites);
                            this.setState({
                                favorites: el.favorites,
                                userID: el.id
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
                    <Nav globalUserName={this.state.globalUserName} setUserName={(name) => this.setUserName(name)}/>
                    <Switch>
                        <Route exact path='/'
                               render={(props) => <Home {...props} filterRecipes={this.filterRecipes} data={this.state.data} setIngredientsState={this.setIngredientsState} updateWhoLikes={this.updateWhoLikes} globalUserName={this.state.globalUserName} updateData={(obj) => {
                                   this.updateData(obj)
                               }} updateHearts={this.updateHearts} updateRecipes={this.updateRecipes}/>}/>
                        <Route exact path='/ulubione' render={(props) => <Favorites {...props} favorites={this.state.favorites}/>}/>
                        {/*<Route exact path='/recipe/:id' component={Recipe}/>*/}
                        <Route exact path='/recipe/:id'  render={(props) => <Recipe {...props} addToFavoritesList={this.addToFavoritesList} favorites={this.state.favorites}/>}/>
                        <Route exact path='/dodawanieProduktu'
                               render={(props) => <AddProduct {...props} updateData={(obj) => {
                                   this.updateData(obj)
                               }} updateRecipes={this.props.updateRecipes} globalUserName={this.state.globalUserName}/>}/>
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