import React from'react';

class Recipe extends  React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log('tesetesetsetset recipe pojedynczy');
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                {' '}
                testetsetsett
            </div>
        );
    }
}

export default Recipe;