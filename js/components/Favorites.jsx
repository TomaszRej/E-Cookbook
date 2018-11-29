import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
class Favorites extends React.Component {
    render() {
        const favorites = this.props.favorites.map((el)=>{
            return (<Link to={`/recipe/${el.id}`}>
                        <li key={el.id}>
                            <a>{el.title}
                                <i style={{color: el.isVegetarian ? 'green': 'gray'}} className="fas fa-leaf"/>
                            </a>
                        </li>
                    </Link>);
        });
        return( <div className='favorites'>
                    <h2>Twoje ulubione przepisy</h2>
                    <ul>
                        {favorites}
                    </ul>
                </div>);
    }
}
Favorites.propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.object),
};
export default Favorites;