import React from 'react';
import {Link} from "react-router-dom";

class Favorites extends React.Component {
    render() {
        const favorites = this.props.favorites.map((el)=>{
            return (<Link to={`/recipe/${el.id}`}>
                        <li key={el.id}><a>{el.title}</a></li>
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

export default Favorites;