import React from "react";
import PropTypes from 'prop-types';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            foodEntered: '',
            foodEnteredTable: [],
        }
    }

    handleCheckboxChange = (e) => {
        this.setState({
            onlyVegetarianChecked: e.target.checked,
        });
    };
    handleFoodInput = (e) => {
        this.setState({
            foodEntered: e.target.value,
        });
    };
    handleForm = (e) => {
        e.preventDefault();
        if (this.state.foodEntered !== '') {
            if (typeof this.props.addToFoodList === 'function') {
                this.props.addToFoodList(this.state.foodEntered);
            }
            this.setState({
                foodEntered: '',
            })
        }
    };
    handleAddClick = () => {
        const valueForFilter = this.state.foodEntered;
        const foodTable = this.state.foodEnteredTable.slice();
        foodTable.push(valueForFilter);

        this.setState({
            foodEnteredTable: foodTable

        }, () => {
            if (typeof this.props.setIngredientsState === 'function') {
                this.props.setIngredientsState(this.state.foodEnteredTable);
            }
        })


    };
    handleDeleteClick = (e) => {
        const id = e.currentTarget.dataset.index;
        const foodTable = this.state.foodEnteredTable.slice();
        foodTable.splice(id, 1);

        if (typeof this.props.removeFromFoodList === 'function') {
            this.props.removeFromFoodList(id);
        }
        this.setState({
            foodEnteredTable: foodTable

        }, () => {

            if (typeof this.props.setIngredientsState === 'function') {
                this.props.setIngredientsState(this.state.foodEnteredTable);
            }
        })
    };

    render() {
        const foodList = this.props.foodList.slice().map((el, index) => {
            return (
                <li key={el} data-index={index} onClick={this.handleDeleteClick} className='foodListItem'>
                    {el}
                    <i className="far fa-trash-alt"/>
                </li>);
        });

        return (
            <div className='search'>
                <div style={{backgroundImage: 'url("./images/logo.png")'}} className='logo'/>
                <h2>Co masz w lodówce?</h2>
                <form onSubmit={(e) => {
                    this.handleForm(e)
                }} className="food">
                    <input onChange={(e) => {
                        this.handleFoodInput(e)
                    }} id="foodInput" type="text" value={this.state.foodEntered}/>
                    <button onClick={this.handleAddClick} className="foodBtn">Dodaj</button>
                </form>
                <ul className='foodList'>
                    {foodList}
                </ul>
            </div>
        );
    }
}

Search.propTypes = {
    addToFoodList: PropTypes.func,
    removeFromFoodList: PropTypes.func,
    setIngredientsState: PropTypes.func,
    foodList: PropTypes.arrayOf(PropTypes.string),

}
;

export default Search;
