import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            foodEntered: '',
        }
    }

    handleCheckboxChange = (e) => {
        this.setState({
            onlyVegetarianChecked: e.target.checked,
        }, () => {
            console.log(this.state.onlyVegetarianChecked);
        });


    }
    handleFoodInput = (e) => {

        this.setState({
            foodEntered: e.target.value,
        }, () => {
            console.log(this.state.foodEntered);
        });
    }
    handleForm = (e) => {
        e.preventDefault();
        console.log('handle submit form ');
        if (typeof this.props.addToFoodList === 'function') {
            this.props.addToFoodList(this.state.foodEntered);
        }
        this.setState({
            foodEntered: '',
        })
    }
    handleDeleteClick = (e) => {

        const id = e.currentTarget.dataset.index;
        //console.log(this.props.removeFromFoodList(id));


        if (typeof this.props.removeFromFoodList === 'function') {
            this.props.removeFromFoodList(id);
        }


    }

    render() {
        const foodList = this.props.foodList.slice().map((el,index) => {
            return <li key={el} data-index={index}  onClick={this.handleDeleteClick} className='foodListItem'>{el} <i className="far fa-trash-alt"></i>
              </li>
        });


        return (
            <div className='search'>
                <h2>Co masz w lodówce?</h2>
                <form onSubmit={(e) => {
                    this.handleForm(e)
                }} className="food">
                    <input onChange={(e) => {
                        this.handleFoodInput(e)
                    }} id="foodInput" type="text" value={this.state.foodEntered}/>
                    <button className="foodBtn">Dodaj</button>
                </form>

                <ul className='foodList'>
                    {foodList}
                </ul>
            </div>
        );
    }
}

export default Search;
