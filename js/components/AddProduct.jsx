import React from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from 'prop-types';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: '',
            title: '',
            description: '',
            vegetarian: '',
            dropDownList: false,
            hotLvlValue: 'Stopień ostrości',
            timeToPrepare: 0,
            ingredient: '',
            ingredients: [],
            instruction: '',
            instructions: []
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };
    handleCheckboxChange = (e) => {
        this.setState({
            vegetarian: e.target.checked,
        })
    };
    handleClick = () => {
        this.setState({
            dropDownList: !this.state.dropDownList,
        })
    };
    handleHotLvlChoice = (e) => {
        this.setState({
            hotLvlValue: e.target.innerText,
            dropDownList: false,
        })
    };
    handleAddingIngredient = (e) => {
        e.preventDefault();
        const ingredients = this.state.ingredients.slice();
        ingredients.push(this.state.ingredient);
        if (this.state.ingredient !== '') {
            this.setState({
                ingredients: ingredients,
                ingredient: '',
            })
        }
    };
    handleAddingInstruction = (e) => {
        e.preventDefault();
        const instructions = this.state.instructions.slice();
        instructions.push(this.state.instruction);
        if (this.state.instruction !== '') {
            this.setState({
                instructions: instructions,
                instruction: '',
            })
        }
    };
    sendData = (e) => {
        e.preventDefault();
        const obj = {
            author: this.props.globalUserName,
            title: this.state.title,
            description: this.state.description,
            timeToPrepare: this.state.timeToPrepare,
            hotLvl: this.state.hotLvlValue,
            isVegetarian: this.state.vegetarian,
            link: "https://via.placeholder.com/150",
            likes: 0,
            whoLikes: [],
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        };

        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((res) => {
                if (typeof this.props.updateData === 'function') {
                    this.props.updateData(res);
                }

                if (typeof this.props.updateRecipes === 'function') {
                    this.props.updateRecipes();
                }

                this.setState({
                    redirect: '/'
                })
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        if (this.state.redirect !== '') {
            return <Redirect to={this.state.redirect}/>
        }
        const styleListPanel = {
            opacity: this.state.dropDownList ? '1': '0',
            display: this.state.dropDownList ? 'block': 'none',
        };

        const listOfIngredients = this.state.ingredients.map((el, index) => {
            return <li key={index}>{el}</li>
        });
        const listOfInstructions = this.state.instructions.map((el, index) => {
            return <li key={index}>{el}</li>
        });

        const arrow = this.state.dropDownList ? <i
            className="fas fa-arrow-down rotateUp" onClick={this.handleClick}/>:<i
            className="fas fa-arrow-down rotateDown" onClick={this.handleClick}/>;

        return (
            <div className='container'>
                <form id="form" onSubmit={this.sendData}>
                    <h3 className='h3'>Dodaj swój przepis</h3>
                    <div className='flex'>
                        <label htmlFor='title'>Nazwa Przepisu</label>
                        <input id='title' value={this.state.title} name='title' onChange={this.handleChange}/>
                    </div>
                    <div className='flex'>
                        <label htmlFor='description'>Opis</label>
                        <textarea id='description' value={this.state.description} name='description'
                                  onChange={this.handleChange}/>
                    </div>
                    <div className='vege'>

                        <input id='vegetarian' type='checkbox' name='isVegetarian' onChange={this.handleCheckboxChange}
                               value={this.state.vegetarian}/>
                        <label className='vege-label' htmlFor='vegetarian'>tylko wegetarianskie</label>
                    </div>
                    <div className='flex'>

                        <label htmlFor='timeToPrepare'>Czas do przygotowania</label>
                        <input id='timeToPrepare' name='timeToPrepare' type='number' value={this.state.timeToPrepare}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="drop_down_list">
                    <span className="list_label">{this.state.hotLvlValue} {arrow}</span>

                        <ul style={styleListPanel} className={this.state.dropDownList ?"list_panel flex" :"list_panel2 flex"}>
                            <li key={0} data-id='0' onClick={this.handleHotLvlChoice}>Łagodny</li>
                            <li key={1} data-id='1' onClick={this.handleHotLvlChoice}>Lekko Ostry</li>
                            <li key={2} data-id='2' onClick={this.handleHotLvlChoice}>Ostry</li>
                            <li key={3} data-id='3' onClick={this.handleHotLvlChoice}>Mega Ostry</li>
                        </ul>
                    </div>
                    <div className='MainLists'>
                        <div className='flex'>
                            <div className="inputIngredients">
                                <input value={this.state.ingredient} name='ingredient' onChange={this.handleChange}/>
                                <button onClick={this.handleAddingIngredient}>Dodaj składnik</button>
                            </div>
                            <ul>
                                {listOfIngredients}
                            </ul>
                        </div>
                        <div className='flex'>
                            <div className='inputInstructions'>
                                <input value={this.state.instruction} name='instruction' onChange={this.handleChange}/>
                                <button onClick={this.handleAddingInstruction}>Dodaj instrukcje</button>
                            </div>
                            <ul>
                                {listOfInstructions}
                            </ul>
                        </div>
                    </div>
                    <button className='addRecipe' type='submit'>Dodaj Przepis</button>
                </form>
            </div>
        );
    }
}
AddProduct.propTypes = {
    globalUserName: PropTypes.string,
    updateRecipes: PropTypes.func,
    updateData: PropTypes.func,
};

export default AddProduct;