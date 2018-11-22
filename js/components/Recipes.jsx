import React from 'react';
import {Link} from 'react-router-dom';

class Recipes extends React.Component {

    handleClickOnHeart = (e) => {

        console.log(e.target.dataset.id);
        const index = e.target.dataset.id;

        this.props.data.forEach((el)=>{
            if(el.id == index){
                console.log('zgodne indeksy!!!!');


            }
        })

        const newLikes = this.props.data[index - 1].likes + 1;

        const data = this.props.data.slice();
        //console.log(data[index - 1].whoLikes, 'dataDATA');

        fetch(`http://localhost:3000/recipes/${index}`, {
            method: 'PATCH',
            body: JSON.stringify({likes: newLikes}),
            headers: {
                "Content-Type": "application/json" // <--- don't forget this!
            }
        })
            .then(response => response.json())
            .then((response) => {

                console.log('testODPOWIEDZ ', response);

                if (typeof this.props.updateHearts === 'function') {
                    this.props.updateHearts(index, newLikes);
                    console.log('wywolanie test sercacacac');
                }


            })
            .catch(error => console.error('Error:', error));


    }

    deleteItem = () => {
        console.log('test usuwania');
        // Do zrobienia


    }

    render() {

        const recipes = this.props.data;
        const arr = [];
        let add = true;
        console.log(this.props.onlyVegetarianChecked, 'zrecipes');
        for (const el of recipes) {
            const style = {
                // backgroundImage: `url("../images/${el.link}")`,
                backgroundImage: `url(${el.link})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width: '500px',
                height: '400px'
            }

            const element = <div key={el.id} style={{position: 'relative'}}className='recipe'>
                <div onClick={this.deleteItem} style={{display:el.author == this.props.globalUserName?'block':'none',position: 'absolute',zIndex:'1'}}>Usuń</div>
                <Link to={`/recipe/${el.id}`}>
                    <div className='img' style={style}/>
                </Link>

                <footer>
                    <p>{el.title}</p>
                    <div className='icons'>
                        <span className='leaf'><i style={{color: el.isVegetarian ? 'green' : 'gray'}} className="fas fa-leaf"/></span>
                        <span className='hot'><i style={{color: el.hotLvl !== 'Łagodny'?'red':'gray'}} className="fab fa-hotjar"/><i style={{color: (el.hotLvl !== 'Łagodny')&&(el.hotLvl !== 'Lekko Ostry')?'red':'gray'}}  className="fab fa-hotjar"/><i style={{color: el.hotLvl === 'Mega Ostry'?'red':'gray'}}
                            className="fab fa-hotjar"/>
                    </span>
                        <span className='time'><i className="far fa-clock"/><span>{el.timeToPrepare}</span>
                        </span>
                        <span className='heart'><i data-id={el.id} onClick={(e) => this.handleClickOnHeart(e)}
                                                   style={{color: el.likes ? 'red' : 'gray'}} className="far fa-heart"/><span>{el.likes}</span></span>
                    </div>
                </footer>
            </div>

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

export default Recipes