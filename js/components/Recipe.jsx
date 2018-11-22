import React from'react';

class Recipe extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount(){
        const index = this.props.match.params.id;
        fetch(`http://localhost:3000/recipes?id=${index}`)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error('Error message?!');
            })
            .then(data => {
                //console.log(data,'z fecha');
                //const dataFromState = this.state.data.slice();
                ///dataFromState.push(data);
                    this.setState({
                        data: data,
                    },()=>{
                        console.log(this.state.data,'z call back');
                    })
            })
            .catch(err => console.log(err));
    }

    render() {
        console.log(this.state.data,"w renderzze");

        let element = '';
        for(const el of this.state.data){
            const ingredients = [];
            const instructions = [];
                for(const i of el.ingredients){
                    ingredients.push(<li>{i}</li>)
                }
                for(const i of el.instructions){
                    instructions.push(<li>{i}</li>);
                }
            element = <div><h3>{el.title}</h3>
                <p>{el.description}</p>
                <div><p>Autor</p><p>{el.author}</p></div>
                <div><h4>Składniki:</h4>
            <ul>{ingredients}</ul>
                </div>
                <div><h4>Instrukcje</h4><ul>{instructions}</ul></div></div>;
        }
        //console.log(this.state.data.isVegetarian);



        return (
            <div>
                {element}

            </div>
        );
    }
}

export default Recipe;