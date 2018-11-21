import React from 'react';
import Search from './Search.jsx';
import Recipes from  './Recipes.jsx';

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

    handleCheckboxChange = (e) => {
        this.setState({
            onlyVegetarianChecked: e.target.checked,
        })
    }



    render() {
        console.log(this.props.data,'z props data w homie');
        return (<div className='container'>
            <Search addToFoodList={(food)=>{this.addToFoodList(food)}} removeFromFoodList={(id)=>{this.removeFromFoodList(id)}} foodList={this.state.foodList}/>


            <div className='onlyVegetarianArea'>
                <input onChange={this.handleCheckboxChange} id="onlyVegetarian" type="checkbox"
                       checked={this.state.onlyVegetarianChecked}/>
                <label htmlFor="onlyVegetarian">tylko wegetarianskie</label>
            </div>

            <Recipes data={this.props.data}/>
        </div>);
    }
}

export default Home;