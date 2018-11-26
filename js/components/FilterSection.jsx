import React from "react";

class FilterSection extends React.Component{
    handleChange = (e) => {
        if(typeof this.props.handleCheckboxChange === 'function'){
            this.props.handleCheckboxChange(e.target.checked);
        }
    }

    render() {
        return (
            <div className='onlyVegetarianArea'>
                {/*<input onChange={this.handleChange} id="onlyVegetarian" type="checkbox"*/}
                       {/*checked={this.props.onlyVegetarianChecked}/>*/}


                    <input type="checkbox" checked={this.props.onlyVegetarianChecked} onChange={this.handleChange}/>
<span>tylko wegetarianskie</span>


            </div>
        );
    }
}

export default FilterSection;