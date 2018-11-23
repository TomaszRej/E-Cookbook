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
            ingredients: []
        }
    }

    updateData = (obj) => {
        const data = this.state.data.slice();
        data.push(obj);
        this.setState({
            data: data
        })
    }
    updateRecipes = (id) => {
        const data = this.state.data.slice();

        // data.filter((el)=>{
        //     console.log(id,el.id);
        //     return Number(el.id) != id;
        // })
        const arr = [];
        data.forEach((el) => {
            if(el.id != id){
                arr.push(el);
            }
        })

        console.log(data,'xxxxxxxxxxxxxxxxxx');

        console.log("updateRECIPES");
        this.setState({
            data: arr
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
        })

        this.setState({
            data: data
        })
        console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;');
    }

    setUserName = (name) => {
        localStorage.removeItem('savedName');
        this.setState({
            globalUserName: name,
        }, () => {

        })
    }

    // filterRecipes = (ingredient) => {
    //     const data = this.state.data.slice();
    //     const arr = [];
    //     console.log(ingredient,'data w metodzie filter');
    //     console.log(data,'wmet filter');
    //     data.forEach((el) =>{
    //         for(const i of el.ingredients){
    //             if(i === ingredient){
    //                 arr.push(el);
    //             }
    //         }
    //     });
    //     this.setState({
    //         data: arr
    //     })
    // }

    setIngredientsState = (ingredients) => {
console.log(this.state.ingredients,'skladniki w set ingredients');
        const ints = ingredients.slice();
        this.setState({
            ingredients: ints
        })
    }

    filterRecipes = () => {
        const data = this.state.data.map((recipe)=>{
            recipe.sort = 0;
            console.log(this.state.ingredients,'skladniki');
            this.state.ingredients.forEach((i)=>{
                console.log(recipe.ingredients,i,'=======');
                if(recipe.ingredients.indexOf(i) >= 0){
                    recipe.sort++;
                }
            })

            return recipe;
        });

        return data;

    }



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
                               render={(props) => <Home {...props} filterRecipes={this.filterRecipes} data={this.state.data} setIngredientsState={this.setIngredientsState} updateWhoLikes={this.updateWhoLikes} globalUserName={this.state.globalUserName} updateData={(obj) => {
                                   this.updateData(obj)
                               }} updateHearts={this.updateHearts} updateRecipes={this.updateRecipes}/>}/>



                        <Route exact path='/recipe/:id' component={Recipe}/>
                        {/*<Route path='/dodawanieProduktu' component={AddProduct globalUser}/>*/}

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