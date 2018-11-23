import React from 'react';
import {Redirect} from "react-router-dom";

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
    }
    handleCheckboxChange = (e) => {
        this.setState({
            vegetarian: e.target.checked,
        },()=>{
            console.log(this.state.vegetarian);
        })
    }
    handleClick = () => {
        this.setState({
            dropDownList: !this.state.dropDownList,
        })

    }
    handleHotLvlChoice = (e) => {
        console.log('hotlevetest');
        console.log(e.target.dataset.id);
        console.log(e.target.innerText);

        this.setState({
            hotLvlValue: e.target.innerText,
            dropDownList: !this.state.dropDownList,
        })
    }
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
    }
    handleAddingInstruction = (e) => {
        e.preventDefault();
        const instructions = this.state.instructions.slice();
        instructions.push(this.state.instruction);
        if(this.state.instruction !== '') {
            this.setState({
                instructions: instructions,
                instruction: '',
            })
        }
    }

    sendData = (e) => {
        e.preventDefault();
        console.log('test Submit Send data');
        console.log(this.props.globalUserName);
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
        }

        fetch('http://localhost:3000/recipes', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json" // <--- don't forget this!
            }
        })
            .then(response => response.json())
            .then((res)=>{
                // to do
                // if(typeof this.props.setUserName === 'function'){
                //     this.props.setUserName(this.state.newUserName);
                // }
                console.log('test');

                if(typeof this.props.updateData === 'function') {
                    this.props.updateData(res);

                }
                if(typeof this.props.updateRecipes=== 'function'){
                    this.props.updateRecipes();
                }


                this.setState({
                    redirect: '/'
                })
            })
            .catch(error => console.error('Error:', error));



    }


    render() {
        if(this.state.redirect !== ''){
            return <Redirect to={this.state.redirect}/>
        }
        const styleListPanel = {
            display: this.state.dropDownList ? 'block' : 'none',
        }

        const listOfIngredients = this.state.ingredients.map((el,index)=>{
            return <li key={index}>{el}</li>
        });
        const listOfInstructions = this.state.instructions.map((el,index)=>{
            return <li key={index}>{el}</li>
        });



        return (
            <div className='container'>
            <form id="form"onSubmit={this.sendData}>
                <h3 className='h3'>Dodaj swój przepis</h3>
                <div className='flex'>
                    <label htmlFor='title'>Nazwa Przepisu</label>
                    <input id='title' value={this.state.title} name='title' onChange={this.handleChange}/>
                </div>
                <div className='flex'>
                    <label htmlFor='description'>Opis</label>
                    <textarea id='description' value={this.state.description} name='description'
                              onChange={this.handleChange}></textarea>
                </div>
                <div className='vege'>

                    <label className='vege-label' htmlFor='vegetarian'>Wegetarianski</label>
                    <input id='vegetarian' type='checkbox' name='isVegetarian' onChange={this.handleCheckboxChange}
                           value={this.state.vegetarian}/>
                </div>
                <div className='flex'>

                    <label htmlFor='timeToPrepare'>Czas do przygotowania</label>
                    <input id='timeToPrepare' name='timeToPrepare' type='number' value={this.state.timeToPrepare} onChange={this.handleChange} />
                </div>
                <div className="drop_down_list">
                    <span className="list_label">{this.state.hotLvlValue} <i
                        className="fas fa-arrow-down" onClick={this.handleClick}/></span>

                    <ul style={styleListPanel} className="list_panel flex">
                        <li key={0} data-id='0' onClick={this.handleHotLvlChoice}>Łagodny</li>
                        <li key={1} data-id='1' onClick={this.handleHotLvlChoice}>Lekko Ostry</li>
                        <li key={2} data-id='2' onClick={this.handleHotLvlChoice}>Ostry</li>
                        <li key={3} data-id='3' onClick={this.handleHotLvlChoice}>Mega Ostry</li>
                    </ul>
                </div>
                <div className='MainLists'>
                    <div className='flex'>
                        <div>
                            <input value={this.state.ingredient} name='ingredient' onChange={this.handleChange}/>
                            <button onClick={this.handleAddingIngredient}>Dodaj składnik</button>
                        </div>
                        <ul>
                            {listOfIngredients}
                        </ul>
                    </div>
                    <div className='flex'>
                        <div>
                            <input value={this.state.instruction} name='instruction' onChange={this.handleChange}/>
                            <button  onClick={this.handleAddingInstruction}>Dodaj instrukcje</button>
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

export default AddProduct;