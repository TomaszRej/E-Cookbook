import React from 'react';
import PropTypes from 'prop-types';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isFavorite: ''
        }
    }

    addToFavorites = () => {
        const id = this.props.match.params.id;
        if (typeof this.props.addToFavoritesList === 'function') {
            this.props.addToFavoritesList(id);
            this.setState({
                isFavorite: true
            })
        }
    };
    removeFromFavorites = () => {
        const id = this.props.match.params.id;
        if (typeof this.props.removeFromFavoritesList === 'function') {
            this.props.removeFromFavoritesList(id);
            this.setState({
                isFavorite: false
            })
        }
    };

    componentDidMount() {
        const index = this.props.match.params.id;
        fetch(`http://localhost:3000/recipes?id=${index}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(data => {
                for (const el of this.props.favorites) {
                    if (this.props.match.params.id == el.id) {
                        this.setState({
                            isFavorite: true
                        })
                    } else {
                        this.setState({
                            isFavorite: false
                        })
                    }
                }
                this.setState({
                    data: data,
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const description = "Opis:  ";
        let element = '';
        for (const el of this.state.data) {
            const ingredients = [];
            const instructions = [];
            for (const i of el.ingredients) {
                ingredients.push(<li className='listOfIngredients'>{i}</li>)
            }
            for (const i of el.instructions) {
                instructions.push(<li >{i}</li>);
            }
            element = (
                <div key={el.id}>
                    <h3>
                        {el.title}
                        <span>
                            <i style={{color: el.isVegetarian ? 'green' : 'gray'}} className="fas fa-leaf"/>
                        </span>
                        <span className='hot'>
                            <i style={{color: el.hotLvl !== 'Łagodny' ? 'red' : 'gray'}}
                               className="fab fa-hotjar"/>
                            <i
                                style={{color: (el.hotLvl !== 'Łagodny') && (el.hotLvl !== 'Lekko Ostry') ? 'red' : 'gray'}}
                                className="fab fa-hotjar"/>
                            <i style={{color: el.hotLvl === 'Mega Ostry' ? 'red' : 'gray'}}
                               className="fab fa-hotjar"/>
                        </span>
                    </h3>
                    <div className="description">
                        <p className='description-label'>{description}</p>
                        <p>{el.description}</p>
                    </div>
                    <div className='author'>
                        <p className='author-label'>Autor:</p>
                        <p>{el.author}</p>
                    </div>
                    <div className='lists'>
                        <div>
                            <h4>Składniki:</h4>
                            <ul>{ingredients}</ul>
                        </div>
                        <div>
                            <h4>Instrukcje:</h4>
                            <ul>{instructions}</ul>
                        </div>
                    </div>
                </div>)
        }

        return (
            <div className='recipeDetails'>
                {element}
                <button style={{display: this.state.isFavorite ? 'none' : 'block'}} onClick={this.addToFavorites}> Dodaj
                    do ulubionych
                </button>
                <button style={{display: this.state.isFavorite ? 'block' : 'none'}}
                        onClick={this.removeFromFavorites}>Usuń z ulubionych
                </button>
            </div>
        );
    }
}

Recipe.propTypes = {
    addToFavoritesList: PropTypes.func,
    removeFromFavoritesList: PropTypes.func
};

export default Recipe;