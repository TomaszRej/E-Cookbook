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
                <input onChange={this.handleChange} id="onlyVegetarian" type="checkbox"
                       checked={this.props.onlyVegetarianChecked}/>
                <label htmlFor="onlyVegetarian">tylko wegetarianskie</label>
            </div>
        );
    }
}

export default FilterSection;