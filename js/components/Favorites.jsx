import React from 'react';

class Favorites extends React.Component {

    render() {
        const favorites = this.props.favorites.map((el)=>{<li key={el.id}><a>{el.title}</a></li>})
        return <div> <h2>Twoje ulubione przepisy</h2>
            <ul>
                {favorites}
            </ul>

        </div>
    }
}

export default Favorites;