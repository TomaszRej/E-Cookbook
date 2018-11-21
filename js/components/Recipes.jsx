import React from 'react';

class Recipes extends React.Component{
    render() {
        const recipes = this.props.data.recipes;
        const arr =[];

        for(const el in recipes){
            const element = <li key={recipes[el].id}>{recipes[el].title}</li>;
           // console.log(recipes[el].title);

            arr.push(element);

        }

        const list = arr.map((el)=>{
            return el;
        });

        return (
            <ul>
                {list}
            </ul>
        );
    }
}

export default Recipes