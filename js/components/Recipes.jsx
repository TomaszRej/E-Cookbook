import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class Recipes extends React.Component {
    handleClickOnHeart = (e) => {
        const index = e.target.dataset.id;
        let newLikesForUpdate;
        let newLikes, whoLikes;
        this.props.data.forEach((el) => {
            if (el.id == index) {
                newLikesForUpdate = el.likes;
                if (this.props.globalUserName) {
                    if (!el.whoLikes.includes(this.props.globalUserName)) {
                        newLikesForUpdate = newLikesForUpdate + 1;
                    } else {
                        newLikesForUpdate = newLikesForUpdate - 1;
                    }
                    whoLikes = el.whoLikes.slice();
                    console.log(this.props.globalUserName);
                    if (!el.whoLikes.includes(this.props.globalUserName)) {
                        whoLikes.push(this.props.globalUserName);
                        newLikes = {
                            likes: el.likes + 1,
                            whoLikes: whoLikes,
                        };
                    } else {
                        const index = whoLikes.indexOf(this.props.globalUserName);
                        whoLikes.splice(index, 1);
                        newLikes = {
                            likes: el.likes - 1,
                            whoLikes: whoLikes,
                        }
                    }
                }

            }
        });

        fetch(`http://localhost:3000/recipes/${index}`, {
            method: 'PATCH',
            body: JSON.stringify(newLikes),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((response) => {
                if (typeof this.props.updateHearts === 'function') {
                    this.props.updateHearts(index, newLikesForUpdate);
                }

                if (typeof this.props.updateWhoLikes === 'function') {
                    this.props.updateWhoLikes(index, whoLikes);
                }
            })
            .catch(error => console.error('Error:', error));
    };
    deleteItem = (e) => {
        const index = e.target.dataset.id;
        fetch(`http://localhost:3000/recipes/${index}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((response) => {
                if (typeof this.props.updateRecipes === 'function') {
                    this.props.updateRecipes(index);
                }
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        const recipes = this.props.filterRecipes();
        recipes.sort((a, b) => {
            return b.sort - a.sort;
        });

        const arr = [];
        let add = true;
        for (const el of recipes) {
            const style = {
                backgroundImage: `url(${el.link})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '500px',
                height: '400px'
            };
            const element = (
                <div key={el.id} style={{position: 'relative'}} className='recipe'>
                    <div className='deleteBtn' data-id={el.id} onClick={this.deleteItem} style={{
                        display: el.author === this.props.globalUserName ? 'block' : 'none',
                        position: 'absolute',
                        zIndex: '1'
                    }}>Usuń
                    </div>
                    <Link to={`/recipe/${el.id}`}>
                        <div className='img' style={style}/>
                    </Link>
                    <footer>
                        <p>{el.title}</p>
                        <div className='icons'>
                            <span className='leaf'>
                                <i style={{color: el.isVegetarian ? 'green' : 'gray'}}
                                   className="fas fa-leaf"/>
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
                            <span className='time'>
                                <i className="far fa-clock"/>
                                <span>{el.timeToPrepare}</span>
                            </span>

                            <span className='heart'>
                                <i data-id={el.id} onClick={this.handleClickOnHeart}
                                   style={{color: el.likes ? 'red' : 'gray'}} className="far fa-heart"/>
                                <span>{el.likes}</span>
                            </span>
                        </div>
                    </footer>
                </div>
            );

            if (this.props.onlyVegetarianChecked) {
                if (el.isVegetarian) {
                    add = true;
                } else {
                    add = false;
                }
            }
            if (add === true) {
                arr.push(element);
            }
        }
        return (
            <ul>
                {arr}
            </ul>
        );
    }
}

Recipes.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    globalUserName: PropTypes.string,
    updateHearts: PropTypes.func,
    updateWhoLikes: PropTypes.func,
    updateRecipes: PropTypes.func,
    filterRecipes: PropTypes.func,
    onlyVegetarianChecked: PropTypes.bool,
};

export default Recipes