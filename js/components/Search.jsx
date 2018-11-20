import React from "react";

class Search extends React.Component {
    render() {
        return (
            <div className='search'>
                <h2>Co masz w lodówce?</h2>
                <div>
                    <input id="foodInput" type="text"/>
                    <button className="foodBtn">Dodaj</button>
                </div>
                <div>
                    <input id="onlyVegetarian" type="checkbox"/>
                    <label htmlFor="onlyVegetarian">tylko wegetarianskie</label>
                </div>
                <ul className='foodList'>

                </ul>
            </div>
        );
    }
}

export default Search;
