import React from 'react';
import Search from './Search.jsx';
import Recipes from  './Recipes.jsx';
import FilterSection from './FilterSection.jsx';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            foodList: [],
            onlyVegetarianChecked: false,
        }
    }
    addToFoodList = (food) => {
        const foodList = this.state.foodList.slice();
        foodList.push(food);
        this.setState({
            foodList: foodList
        })
    };
    removeFromFoodList = (id) => {
        const foodList = this.state.foodList.slice();
        foodList.splice(id,1);

        this.setState({
            foodList: foodList,
        })
    };
    handleCheckboxChange = (event) => {
        this.setState({
            onlyVegetarianChecked: event,
        })
    };

    render() {

        return (
            <div className='container'>
                <Search addToFoodList={(food)=>{this.addToFoodList(food)}} removeFromFoodList={(id)=>{this.removeFromFoodList(id)}} foodList={this.state.foodList} setIngredientsState={this.props.setIngredientsState} filterRecipes={this.props.filterRecipes}/>
                <FilterSection handleCheckboxChange={this.handleCheckboxChange}  checked={this.state.onlyVegetarianChecked}/>
                <Recipes updateWhoLikes={this.props.updateWhoLikes} updateRecipes={this.props.updateRecipes} filterRecipes={this.props.filterRecipes} updateHearts={this.props.updateHearts} globalUserName={this.props.globalUserName} data={this.props.data} onlyVegetarianChecked={this.state.onlyVegetarianChecked}/>
            </div>);
    }
}

export default Home;