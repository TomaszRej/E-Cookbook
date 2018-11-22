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
        },()=>{
            console.log(this.state.foodList);
        })
    }

    removeFromFoodList = (id) => {
        const foodList = this.state.foodList.slice();
        foodList.splice(id,1);

        this.setState({
            foodList: foodList,
        })
    }

    handleCheckboxChange = (event) => {
        this.setState({
            onlyVegetarianChecked: event,
        })
    }



    render() {
        console.log(this.props.data,'z props data w homie');
        return (<div className='container'>
            <Search addToFoodList={(food)=>{this.addToFoodList(food)}} removeFromFoodList={(id)=>{this.removeFromFoodList(id)}} foodList={this.state.foodList} filterRecipes={this.props.filterRecipes}/>

            <FilterSection handleCheckboxChange={this.handleCheckboxChange}  checked={this.state.onlyVegetarianChecked}/>

            <Recipes updateHearts={this.props.updateHearts} globalUserName={this.props.globalUserName} data={this.props.data} onlyVegetarianChecked={this.state.onlyVegetarianChecked}/>
        </div>);
    }
}

export default Home;