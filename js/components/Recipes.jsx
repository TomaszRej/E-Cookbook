import React from 'react';
import {Link} from 'react-router-dom';
class Recipes extends React.Component {
    handleClick = (e) => {
        console.log(e.target);
        console.log('test klika w zdjecei ');
    }
    render() {
        const recipes = this.props.data;
        const arr = [];

        for (const el of recipes) {
            const style = {
                backgroundImage: `url("../images/${el.link}")`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '500px',
                height: '400px'
            }

            console.log(el.title);
            console.log(el.isVegetarian);
            const element = <div key={el.id} className='recipe'>
                    <Link to={`/recipe/${el.id}`}><div className='img'style={style}/></Link>
                <footer>
                    <p>{el.title}</p>
                    <div className='icons'>
                        <span><i style={{color:el.isVegetarian ? 'green' :'gray' }} className="fas fa-leaf"/></span>
                        <span className='hot'><i className="fab fa-hotjar"/><i className="fab fa-hotjar"/><i className="fab fa-hotjar"/>
                    </span>
                        <span className='time'><i className="far fa-clock"/><span>{el.timeToPrepare}</span>
                        </span>
                        <span className='heart'><i style={{color:el.likes ? 'red' :'gray'}} className="far fa-heart"/><span>{el.likes}</span></span>
                    </div>
                </footer>
            </div>

            arr.push(element);
        }



        return (
            <ul>
                {arr}
            </ul>
        );
    }
}

export default Recipes