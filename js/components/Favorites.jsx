import React from 'react';
import {Link} from "react-router-dom";

class Favorites extends React.Component {

    render() {
        console.log(this.props.favorites);
        const favorites = this.props.favorites.map((el)=>{
            return <Link to={`/recipe/${el.id}`}>
                <li key={el.id}><a href='#'>{el.title}</a></li>
                {/*<li key={el.id}>{el.title}</li>*/}
                </Link>
        });
        return <div> <h2>Twoje ulubione przepisy</h2>
            <ul>
                {favorites}
            </ul>

        </div>
    }
}

export default Favorites;